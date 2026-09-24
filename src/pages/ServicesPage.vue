<script setup>
const services = [
  { number: '01', title: 'Recording', text: 'A comfortable, focused room and a thoughtful signal chain for vocals, instruments, and ensembles.' },
  { number: '02', title: 'Mixing', text: 'Detailed, musical mixes with clarity, movement, and the character your songs deserve.' },
  { number: '03', title: 'Production', text: 'Hands-on creative support—from shaping arrangements to finding the sound that makes the track click.' },
]
</script>

<template>
  <article class="services-page section-pad">
    <header class="section-heading"><div><p class="section-label">What we do</p><h1>From first take<br /><em>to final master.</em></h1></div><p>Choose one service or bring us the whole project. Every session starts with a conversation about what the music needs.</p></header>
    <div class="service-grid">
      <section v-for="service in services" :key="service.number" class="service-card"><span>{{ service.number }}</span><h2>{{ service.title }}</h2><p>{{ service.text }}</p></section>
    </div>
    <RouterLink class="button button-primary dark-text" to="/contact">Tell us about your project <span aria-hidden="true">→</span></RouterLink>
  </article>
</template>
