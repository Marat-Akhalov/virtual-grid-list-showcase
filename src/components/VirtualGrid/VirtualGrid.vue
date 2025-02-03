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
  >
    <div class="virtual-grid__spacer">
      <div class="virtual-grid__item"></div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
