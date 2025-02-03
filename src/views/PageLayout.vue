<script setup lang="ts"></script>

<template>
  <main>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense timeout="0">
          <Component :is="Component" />
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      </template>
    </RouterView>
  </main>
</template>

<style scoped lang="scss"></style>
