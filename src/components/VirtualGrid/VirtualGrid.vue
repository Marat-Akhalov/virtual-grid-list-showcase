<script setup lang="ts" generic="T">
import { computed, ref, useTemplateRef, watchEffect } from 'vue'
import { useBreakpoints } from '@/composables/useBreakpoints'

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
const startIdx = computed(() => {
  // прокрученную область делим на высоту элемента и умножаем на количество колонок
  // чтобы учесть кейсы, когда прокручиваемых эл-ов несколько в строке
  // и вычитаем так же верхние заполнители overflow

  return Math.max(0, Math.floor(scrollTop.value / itemHeight) * cols.value - overflow)
})
const visibleCount = computed(() => {
  const itemPerView = Math.ceil(viewportHeight / itemHeight) * cols.value

  return itemPerView + 2 * (overflow * cols.value)
})
const visibleItems = computed(() => {
  // учитываем кейс, когда сумма может выйти за пределы массива
  const endIdx = Math.min(items.length, startIdx.value + visibleCount.value)

  return items.slice(startIdx.value, endIdx)
})
const translateY = computed(() => {
  console.log('startIdx: ', startIdx.value)
  console.log('startIdx / cols: ', startIdx.value / cols.value)
  console.log('startIdx / cols * itemHeight: ', (startIdx.value / cols.value) * itemHeight)
  console.log('-----------------------------------')
  const rowStart = Math.floor(startIdx.value / cols.value)
  const shift = Math.max(0, rowStart * itemHeight)
  return shift
})

const onScroll = () => {
  if (container.value) {
    console.log(container.value.scrollTop)
    scrollTop.value = container.value.scrollTop
  }
}

const colsMap = {
  sm: 1,
  lg: 2,
  xl: 3,
  '2xl': 4,
}

const { type } = useBreakpoints()

watchEffect(() => {
  cols.value = colsMap[type.value] || 2
})
</script>

<template>
  <div
    class="virtual-grid"
    ref="container"
    :style="{ height: `${viewportHeight}px` }"
    @scroll="onScroll"
  >
    <div
      class="virtual-grid__spacer"
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        class="virtual-grid__wrapper"
        :style="{ transform: `translateY(${translateY}px)` }"
      >
        <div
          v-for="(item, idx) in visibleItems"
          :key="idx"
          class="virtual-grid__item"
          :style="{ height: `${itemHeight}px` }"
        >
          {{ item }}
        </div>
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

  &__item {
    border-radius: var(--border);
    padding: 1.5rem;
    background-color: darkmagenta;
  }
}
</style>
