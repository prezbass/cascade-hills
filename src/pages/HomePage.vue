<script setup>
import ImageCarousel from '../components/ImageCarousel.vue'
</script>

<template>
  <div class="home-page">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="hero-copy">
        <p class="eyebrow"><span></span> Pacific Northwest recording</p>
        <h1 id="hero-title">Give your music<br /><em>room to move.</em></h1>
        <p class="hero-intro">Cascade Hills is a recording studio built for clear thinking, honest performances, and records that feel alive.</p>
        <div class="hero-actions">
          <RouterLink class="button button-primary" to="/contact">Tell us about your project <span aria-hidden="true">↗</span></RouterLink>
          <RouterLink class="text-link" to="/studio">Explore the studio <span aria-hidden="true">→</span></RouterLink>
        </div>
      </div>
      <ImageCarousel />
    </section>
    <section class="home-intro section-pad">
      <p class="section-label">Cascade Hills</p>
      <h2>A calm place to make<br />something honest.</h2>
      <p>Recording, mixing, and production shaped around the music—not the other way around.</p>
      <RouterLink class="inline-link" to="/services">See what we do →</RouterLink>
    </section>
  </div>
</template>
