<script setup>
import { ref } from 'vue'

const open = ref(false)
const close = () => { open.value = false }
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#home" aria-label="Cascade Hills home" @click="close">
      <img src="/cascade-hills-logo.png" alt="Cascade Hills Recording Studio" />
    </a>

    <button class="menu-button" type="button" :aria-expanded="open" aria-controls="site-nav" @click="open = !open">
      <span></span><span></span><span></span>
      <span class="sr-only">Toggle navigation</span>
    </button>

    <nav id="site-nav" :class="{ open }" aria-label="Main navigation">
      <a href="#studio" @click="close">Studio</a>
      <a href="#services" @click="close">Services</a>
      <a href="#contact" @click="close">Contact</a>
      <a class="nav-cta" href="mailto:studio@cascade-hills.com">Start a project</a>
    </nav>
  </header>
</template>
