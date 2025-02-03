<script setup lang="ts" generic="T">
import { computed, ref, useTemplateRef } from 'vue'

const {
  viewportHeight = 500,
  itemHeight = 250,
  items,
} = defineProps<{
  items: T[]
  viewportHeight?: number
  itemHeight?: number
}>()

const container = useTemplateRef('container')
const scrollTop = ref<number>(0)
const cols = ref<number>(2)
const overflow = 2

const totalHeight = computed(() => {
  const rowsCount = Math.ceil(items.length / cols.value)

  return rowsCount * itemHeight + overflow * cols.value
})
</script>

<template>
  <div
    class="virtual-grid"
    ref="container"
    :style="{ height: `${viewportHeight}px` }"
  >
    <div
      class="virtual-grid__spacer"
      :style="{ height: `${totalHeight}px` }"
    >
      <div class="virtual-grid__wrapper">
        <div class="virtual-grid__item"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.virtual-grid {
  --border: 8px;

  border-radius: var(--border);
  overflow-y: auto;
  background-color: darkcyan;

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    border-radius: var(--border);
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
