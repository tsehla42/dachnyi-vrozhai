<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
    <AdvicesCard v-for="i in 4" :key="i" />
  </div>
</template>

<style scoped lang="scss"></style>
