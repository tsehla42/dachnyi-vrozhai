<script setup lang="ts">
const scrollY = ref(0);
const scrollHeight = ref(1);

const onScroll = () => {
  window.requestAnimationFrame(() => {
    scrollY.value = document.body.scrollTop;
    scrollHeight.value = document.body.scrollHeight - document.body.clientHeight;
  });
};

onMounted(() => {
  scrollHeight.value = document.body.scrollHeight - document.body.clientHeight;
  document.body.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  document.body.removeEventListener('scroll', onScroll);
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
