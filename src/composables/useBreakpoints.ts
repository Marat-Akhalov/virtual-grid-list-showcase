import { computed, onMounted, onUnmounted, ref } from 'vue'

export const useBreakpoints = () => {
  const windowWidth = ref(window.innerWidth)

  const type = computed(() => {
    if (windowWidth.value < 640) return 'sm'
    if (windowWidth.value < 1024) return 'lg'
    if (windowWidth.value < 1280) return 'xl'
    else return '2xl'
  })

  const onWidthChange = () => (windowWidth.value = window.innerWidth)

  const width = computed(() => windowWidth.value)

  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  return { width, type }
}
