<script setup>
import { RouterLink } from 'vue-router'

const footerCategories = ['Nature', 'Cities', 'Beaches', 'Mountains']
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <RouterLink to="/" class="site-footer__title">Travel Places</RouterLink>
        <p class="site-footer__tagline">
          An editorial atlas of remarkable landscapes, timeless cities, and quiet coastlines across the globe.
        </p>
      </div>

      <div class="site-footer__links">
        <span class="site-footer__label">Explore by Landscape</span>
        <ul class="site-footer__list">
          <li v-for="category in footerCategories" :key="category">
            <RouterLink
              :to="{ name: 'home', query: { category } }"
              class="site-footer__link"
            >
              {{ category }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="container site-footer__bottom">
      <span>© {{ currentYear }} Travel Places Journal</span>
      <span>Curated for unhurried discovery</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: clamp(4rem, 8vw, 6.5rem);
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  padding-block: clamp(2.5rem, 5vw, 3.75rem) 1.75rem;
}

.site-footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2.5rem;
  padding-bottom: 2.25rem;
  border-bottom: 1px solid var(--color-border);
}

.site-footer__brand {
  max-width: 380px;
}

.site-footer__title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-ink);
}

.site-footer__tagline {
  margin: 0.65rem 0 0;
  font-size: 0.9rem;
  color: var(--color-ink-secondary);
  line-height: 1.65;
}

.site-footer__label {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
  margin-bottom: 0.85rem;
}

.site-footer__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-footer__link {
  font-size: 0.9rem;
  color: var(--color-ink-secondary);
  transition: color 0.2s ease;
}

.site-footer__link:hover {
  color: var(--color-accent);
}

.site-footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 1.4rem;
  font-size: 0.8rem;
  color: var(--color-ink-muted);
}

@media (max-width: 680px) {
  .site-footer__inner {
    flex-direction: column;
    gap: 1.75rem;
  }
}
</style>
