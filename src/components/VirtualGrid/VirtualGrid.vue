<script setup lang="ts" generic="T">
import { useTemplateRef } from 'vue'

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
