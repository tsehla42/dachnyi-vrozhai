<script setup lang="ts">
import type { Ref } from 'vue';
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const heroImageSrc = inject<Ref<string | null>>('heroImageSrc', ref(null));

const fallbackSrc = '/images/fallback/fallback-200x200.jpg';
const imgRef = ref<ComponentPublicInstance | null>(null);
const isFallback = ref(false);

const applyFallback = (img: HTMLImageElement) => {
  isFallback.value = true;
  img.srcset = '';
  img.src = fallbackSrc;
};

const onImageError = (e: string | Event) => {
  if (!(e instanceof Event)) return;
  const img = e.target as HTMLImageElement | null;
  if (!img || img.src.includes('fallback')) return;
  applyFallback(img);
};

onMounted(() => {
  const img = imgRef.value?.$el as HTMLImageElement | undefined;
  if (img?.complete && img.naturalWidth === 0) {
    applyFallback(img);
  }
});
</script>

<template>
  <h1 v-bind="attrs" class="mb-4 font-primary"><slot /></h1>
  <NuxtImg
    v-if="heroImageSrc"
    ref="imgRef"
    class="float-left w-[400px] max-w-full mr-6 rounded-lg aspect-[4/3] max-sm:float-none max-sm:block max-sm:w-full max-sm:max-h-[300px] max-sm:mb-4"
    :class="isFallback ? 'object-contain bg-[#c8d979]' : 'object-cover'"
    :src="heroImageSrc"
    width="400"
    height="300"
    loading="eager"
    @error="onImageError"
  />
</template>
