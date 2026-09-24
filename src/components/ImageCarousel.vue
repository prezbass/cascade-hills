<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const slides = [
  { src: '/studio-01.jpg', alt: 'Cascade Hills studio', label: 'The studio' },
  { src: '/studio-02.jpg', alt: 'Cascade Hills recording space', label: 'The room' },
  { src: '/studio-03.jpg', alt: 'Recording equipment at Cascade Hills', label: 'The tools' },
]
const active = ref(0)
let timer
const current = computed(() => slides[active.value])
const go = (index) => { active.value = (index + slides.length) % slides.length }
const restart = () => { clearInterval(timer); timer = setInterval(() => go(active.value + 1), 6000) }
const select = (index) => { go(index); restart() }
onMounted(restart)
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section class="carousel" aria-roledescription="carousel" aria-label="Cascade Hills studio photographs">
    <div class="carousel-stage">
      <div v-for="(slide, index) in slides" :key="slide.src" class="carousel-slide" :class="{ active: index === active }">
        <img :src="slide.src" :alt="slide.alt" @error="$event.currentTarget.classList.add('missing')" />
        <div class="carousel-placeholder" aria-hidden="true"><span>{{ String(index + 1).padStart(2, '0') }}</span><p>{{ slide.label }}</p><small>Studio photograph coming soon</small></div>
      </div>
      <div class="carousel-caption"><span>{{ String(active + 1).padStart(2, '0') }}</span>{{ current.label }}</div>
      <button class="carousel-arrow previous" type="button" aria-label="Previous image" @click="select(active - 1)">←</button>
      <button class="carousel-arrow next" type="button" aria-label="Next image" @click="select(active + 1)">→</button>
    </div>
    <div class="carousel-dots" aria-label="Choose a slide">
      <button v-for="(_, index) in slides" :key="index" type="button" :class="{ active: index === active }" :aria-label="`Show image ${index + 1}`" :aria-current="index === active ? 'true' : undefined" @click="select(index)"></button>
    </div>
  </section>
</template>
