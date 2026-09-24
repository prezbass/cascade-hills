<script setup>
import { reactive, ref } from 'vue'
const form = reactive({ name: '', email: '', notes: '' })
const status = ref('idle')
const message = ref('')

async function submit() {
  status.value = 'sending'; message.value = ''
  try {
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.message || 'We could not send your message. Please try again.')
    status.value = 'success'; message.value = 'Thank you. Your note is on its way, and we’ll be in touch soon.'
    form.name = ''; form.email = ''; form.notes = ''
  } catch (error) { status.value = 'error'; message.value = error.message }
}
</script>

<template>
  <article class="contact-page section-pad">
    <div class="contact-copy"><p class="section-label light">Start a conversation</p><h1>Have a project<br /><em>in mind?</em></h1><p>Tell us what you're making, where you are in the process, and what kind of help you need.</p><a href="mailto:studio@cascade-hills.com">studio@cascade-hills.com</a></div>
    <form class="contact-form" @submit.prevent="submit">
      <label for="name">Name</label><input id="name" v-model.trim="form.name" name="name" type="text" autocomplete="name" maxlength="120" required />
      <label for="email">Email address</label><input id="email" v-model.trim="form.email" name="email" type="email" autocomplete="email" maxlength="254" required />
      <label for="notes">Contact notes</label><textarea id="notes" v-model.trim="form.notes" name="notes" rows="8" maxlength="4000" required></textarea>
      <button class="button button-light" type="submit" :disabled="status === 'sending'">{{ status === 'sending' ? 'Sending…' : 'Send message' }} <span aria-hidden="true">↗</span></button>
      <p v-if="message" class="form-message" :class="status" role="status">{{ message }}</p>
    </form>
  </article>
</template>
