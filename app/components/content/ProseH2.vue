<script setup lang="ts">
defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
</script>

<template>
  <h2 v-bind="attrs" class="font-primary"><slot /></h2>
</template>
