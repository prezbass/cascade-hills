<script setup>
import StudioHeader from './components/StudioHeader.vue'

const services = [
  { number: '01', title: 'Recording', text: 'A comfortable, focused room and a thoughtful signal chain for vocals, instruments, and ensembles.' },
  { number: '02', title: 'Mixing', text: 'Detailed, musical mixes with clarity, movement, and the character your songs deserve.' },
  { number: '03', title: 'Production', text: 'Hands-on creative support—from shaping arrangements to finding the sound that makes the track click.' },
]
</script>

<template>
  <div id="home" class="site-shell">
    <StudioHeader />

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="hero-copy">
          <p class="eyebrow"><span></span> Pacific Northwest recording</p>
          <h1 id="hero-title">Give your music<br /><em>room to move.</em></h1>
          <p class="hero-intro">Cascade Hills is a recording studio built for clear thinking, honest performances, and records that feel alive.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="mailto:studio@cascade-hills.com?subject=Studio%20project%20inquiry">Tell us about your project <span aria-hidden="true">↗</span></a>
            <a class="text-link" href="#studio">Explore the studio <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div class="signal-card" aria-label="Decorative audio signal display">
          <div class="signal-top"><span>LIVE ROOM / A</span><span class="status">READY</span></div>
          <div class="waveform" aria-hidden="true">
            <i v-for="n in 34" :key="n" :style="{ '--n': n }"></i>
          </div>
          <div class="signal-bottom"><span>48 kHz · 24 bit</span><span>−12.4 dB</span></div>
        </div>
      </section>

      <section id="studio" class="studio-section section-pad">
        <div>
          <p class="section-label">The studio</p>
          <h2>A space that gets<br />out of the way.</h2>
        </div>
        <div class="studio-copy">
          <p class="lead">Great sessions happen when the room disappears and everyone can listen.</p>
          <p>Our approach pairs a calm, welcoming environment with reliable modern tools. Whether you arrive with a finished arrangement or a half-formed idea, we meet the music where it is and help move it forward.</p>
          <div class="details">
            <div><strong>Thoughtful acoustics</strong><span>Controlled, natural, and comfortable</span></div>
            <div><strong>Flexible workflow</strong><span>Built around the way you create</span></div>
            <div><strong>Artist-first sessions</strong><span>Unhurried, clear, and collaborative</span></div>
          </div>
        </div>
      </section>

      <section id="services" class="services-section section-pad">
        <div class="section-heading">
          <div><p class="section-label">What we do</p><h2>From first take<br />to final master.</h2></div>
          <p>Choose one service or bring us the whole project. Every session starts with a conversation about what the music needs.</p>
        </div>
        <div class="service-grid">
          <article v-for="service in services" :key="service.number" class="service-card">
            <span>{{ service.number }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </article>
        </div>
      </section>

      <section id="contact" class="contact-section section-pad">
        <p class="section-label light">Start a conversation</p>
        <h2>Have a project<br />in mind?</h2>
        <p>Tell us what you're making, where you are in the process, and what kind of help you need.</p>
        <a class="button button-light" href="mailto:studio@cascade-hills.com?subject=Studio%20project%20inquiry">studio@cascade-hills.com <span aria-hidden="true">↗</span></a>
        
      </section>
    </main>

    <footer>
      <img src="/cascade-hills-logo.png" alt="Cascade Hills Recording Studio" />
      <p>© {{ new Date().getFullYear() }} Cascade Hills Recording Studio</p>
      <a href="#home">Back to top ↑</a>
    </footer>
  </div>
</template>
