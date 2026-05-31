<script setup lang="ts">
import type { Ref } from 'vue';
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const heroImageSrc = inject<Ref<string | null>>('heroImageSrc', ref(null));

const fallbackSrc = '/images/fallback/fallback-200x200.jpg';

const onImageError = (e: string | Event) => {
  if (!(e instanceof Event)) return;
  const img = e.target as HTMLImageElement | null;
  if (!img || img.src.includes('fallback')) return;
  img.src = fallbackSrc;
};
</script>

<template>
  <h1 v-bind="attrs"><slot /></h1>
  <NuxtImg
    v-if="heroImageSrc"
    class="hero-image"
    :src="heroImageSrc"
    width="400"
    height="300"
    loading="eager"
    @error="onImageError"
  />
</template>

<style scoped lang="scss">
h1 {
  margin-bottom: 1rem;
}

.hero-image {
  float: left;
  width: 400px;
  max-width: 100%;
  margin: 0 24px 0 0;
  border-radius: 0.5rem;
  object-fit: cover;
  aspect-ratio: 4 / 3;

  @media (max-width: 767px) {
    float: none;
    display: block;
    width: 100%;
    max-height: 300px;
    margin: 0 0 1rem 0;
  }
}
</style>
