<script setup lang="ts">
import VirtualGrid from '@/components/VirtualGrid/VirtualGrid.vue'

const items = Array.from({ length: 100 }, (_, idx) => `Item ${idx + 1}`)
</script>

<template>
  <VirtualGrid :items="items" />
</template>
