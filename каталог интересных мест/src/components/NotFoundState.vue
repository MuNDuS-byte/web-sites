<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  eyebrow: {
    type: String,
    default: '404 — Off the Map',
  },
  title: {
    type: String,
    default: 'Destination not found',
  },
  message: {
    type: String,
    default:
      'The place you are looking for may have moved or does not exist in our current journal.',
  },
})
</script>

<template>
  <section class="not-found container">
    <div class="not-found__card">
      <div class="not-found__icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.4">
          <circle cx="24" cy="24" r="20" />
          <polygon points="24,10 29,24 24,38 19,24" fill="var(--color-accent-soft)" stroke="var(--color-accent)" />
          <circle cx="24" cy="24" r="2.2" fill="var(--color-accent)" stroke="none" />
        </svg>
      </div>
      <p class="not-found__eyebrow">{{ eyebrow }}</p>
      <h1 class="not-found__title">{{ title }}</h1>
      <p class="not-found__message">{{ message }}</p>
      <RouterLink to="/" class="not-found__button">
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.5 10h-11m4.5-4.5L4.5 10 9 14.5" />
        </svg>
        Back to destinations
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  padding-block: clamp(4rem, 10vw, 7rem);
  display: flex;
  justify-content: center;
}

.not-found__card {
  max-width: 520px;
  width: 100%;
  text-align: center;
  padding: clamp(2.5rem, 6vw, 3.75rem) clamp(1.5rem, 4vw, 3rem);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
}

.not-found__icon {
  display: inline-flex;
  color: var(--color-ink-muted);
  margin-bottom: 1.25rem;
}

.not-found__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.not-found__title {
  margin: 0.55rem 0 0;
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 4vw, 2.35rem);
  font-weight: 500;
  line-height: 1.18;
  color: var(--color-ink);
}

.not-found__message {
  margin: 0.9rem auto 0;
  max-width: 40ch;
  font-size: 0.95rem;
  color: var(--color-ink-secondary);
}

.not-found__button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.85rem;
  padding: 0.78rem 1.45rem;
  border-radius: var(--radius-pill);
  background: var(--color-ink);
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 500;
  transition: background-color 0.22s ease, transform 0.22s var(--ease-editorial);
}

.not-found__button:hover {
  background: var(--color-accent);
  transform: translateY(-1px);
}
</style>
