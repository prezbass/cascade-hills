<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const open = ref(false)
const route = useRoute()
const close = () => { open.value = false }
watch(() => route.fullPath, close)
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand" to="/" aria-label="Cascade Hills home" @click="close">
      <img src="/cascade-hills-logo.png" alt="Cascade Hills Recording Studio" />
    </RouterLink>
    <button class="menu-button" type="button" :aria-expanded="open" aria-controls="site-nav" @click="open = !open">
      <span></span><span></span><span></span><span class="sr-only">Toggle navigation</span>
    </button>
    <nav id="site-nav" :class="{ open }" aria-label="Main navigation">
      <RouterLink to="/studio">Studio</RouterLink>
      <RouterLink to="/services">Services</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
      <a href="https://tidycal.com/marcmiller" target="_blank" rel="noopener noreferrer">Book Time</a>
      <a class="nav-cta" href="https://auth.cascade-hills.com/">Client Login</a>
    </nav>
  </header>
</template>
