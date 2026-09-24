<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteFooter from './SiteFooter.vue'

const panel = ref(null)
const route = useRoute()
watch(() => route.fullPath, () => panel.value?.scrollTo({ top: 0, behavior: 'auto' }))
</script>

<template>
  <div ref="panel" class="content-panel">
    <main>
      <RouterView v-slot="{ Component }"><Transition name="page" mode="out-in"><component :is="Component" /></Transition></RouterView>
    </main>
    <SiteFooter />
  </div>
</template>
