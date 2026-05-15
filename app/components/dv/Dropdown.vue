<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  mode: {
    type: String,
    default: 'hover',
  },
  content: {
    type: Object,
    default: () => ({ side: 'bottom', align: 'start' }),
  },
  ui: {
    type: Object,
    default: () => {},
  },
  open: {
    type: Boolean,
    default: undefined,
  },
  portal: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:open']);
</script>

<template>
  <UDropdownMenu
    :items="props.items"
    :content="props.content"
    :ui="props.ui"
    :modal="false"
    :open="props.open"
    :portal="props.portal"
    @update:open="emit('update:open', $event)"
  >
    <slot />

    <template #item="{ item }">
      <slot name="item" :item="item" />
    </template>
  </UDropdownMenu>
</template>

<style scoped lang="scss"></style>
