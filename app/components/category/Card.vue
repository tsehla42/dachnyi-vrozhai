<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  pictureSrc: {
    type: String,
    required: true,
  },
});

const imgRef = ref<ComponentPublicInstance | null>(null);

const applyFallback = (img: HTMLImageElement) => {
  img.srcset = '';
  img.src = '/images/fallback/fallback-200x200.jpg';
};

const onImageError = (e: string | Event) => {
  if (!(e instanceof Event)) return;
  const img = e.target as HTMLImageElement | null;
  if (!img) return;
  if (img.src.includes('fallback')) return;
  applyFallback(img);
};

// SSR hydration race: the browser may fire the error event before Vue attaches
// @error listeners. Check on mount for images that already failed to load.
onMounted(() => {
  const img = imgRef.value?.$el as HTMLImageElement | undefined;
  if (img?.complete && img.naturalWidth === 0) {
    applyFallback(img);
  }
});
</script>

<template>
  <NuxtLink
    class="category group relative flex items-center justify-center cursor-pointer w-full active:scale-110"
    :to
  >
    <h3
      class="name absolute z-[2] p-1 bg-black/35 backdrop-blur-sm rounded-lg text-center text-lg text-orange-100 font-primary group-hover:text-orange-300 w-min max-w-48 overflow-hidden text-ellipsis transition-colors [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]"
    >
      {{ label }}
    </h3>
    <NuxtImg
      ref="imgRef"
      class="picture w-full max-w-40 sm:max-w-52 aspect-square object-cover saturate-[70%] brightness-90 group-hover:saturate-100 group-hover:brightness-100 transition-all rounded-md border-4 border-solid border-black"
      :src="pictureSrc"
      @error="onImageError"
      width="200"
      height="200"
      loading="lazy"
    />
  </NuxtLink>
</template>

