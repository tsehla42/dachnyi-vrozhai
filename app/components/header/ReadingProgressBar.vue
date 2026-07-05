<script setup lang="ts">
const scrollY = ref(0);
const scrollHeight = ref(1);

const onScroll = () => {
  window.requestAnimationFrame(() => {
    scrollY.value = window.scrollY;
    scrollHeight.value = document.documentElement.scrollHeight - window.innerHeight;
  });
};

onMounted(() => {
  scrollHeight.value = document.documentElement.scrollHeight - window.innerHeight;
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <div class="h-1 w-full bg-green-800">
    <div
      class="h-full bg-green-600 transition-[width] duration-300 ease-out rounded-r-full"
      :style="{ width: `${Math.round((scrollY / scrollHeight) * 100)}%` }"
    />
  </div>
</template>
