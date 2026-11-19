<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'

const route = useRoute()
const router = useRouter()
const { favoritesCount } = useFavorites()

const isCatalogActive = computed(() => route.name === 'catalog' && route.query.favorites !== '1')
const isFavoritesActive = computed(() => route.name === 'catalog' && route.query.favorites === '1')

function goToFavorites() {
  if (isFavoritesActive.value) {
    router.push({ name: 'catalog' })
  } else {
    router.push({ name: 'catalog', query: { favorites: '1' } })
  }
}
</script>

<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <RouterLink :to="{ name: 'catalog' }" class="brand" aria-label="Movie Explorer Home">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.5" y="1.5" width="33" height="33" rx="9.5" stroke="url(#brandRing)" stroke-width="2" />
            <path d="M14 11.5L25.5 18L14 24.5V11.5Z" fill="url(#brandPlay)" />
            <defs>
              <linearGradient id="brandRing" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F5B942" />
                <stop offset="1" stop-color="#E54861" />
              </linearGradient>
              <linearGradient id="brandPlay" x1="14" y1="11" x2="25.5" y2="25" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FDE08D" />
                <stop offset="1" stop-color="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span class="brand-text">
          Movie<span class="brand-accent">Explorer</span>
        </span>
      </RouterLink>

      <nav class="nav-actions" aria-label="Primary navigation">
        <RouterLink
          :to="{ name: 'catalog' }"
          class="nav-link"
          :class="{ 'is-active': isCatalogActive }"
        >
          Catalog
        </RouterLink>

        <button
          type="button"
          class="favorites-pill"
          :class="{ 'is-active': isFavoritesActive }"
          :aria-pressed="isFavoritesActive"
          @click="goToFavorites"
        >
          <svg class="heart-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <span class="favorites-label">Favorites</span>
          <span class="favorites-badge">{{ favoritesCount }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--nav-height);
  background: rgba(9, 11, 16, 0.78);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border-subtle);
}

.navbar-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  transition: opacity var(--transition-fast);
}

.brand:hover {
  opacity: 0.92;
}

.brand-mark {
  width: 34px;
  height: 34px;
  display: inline-flex;
  flex-shrink: 0;
}

.brand-mark svg {
  width: 100%;
  height: 100%;
}

.brand-accent {
  color: var(--accent-gold);
  margin-left: 3px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-link {
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color var(--transition-fast), background-color var(--transition-fast);
}

.nav-link:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.nav-link.is-active {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.08);
}

.favorites-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  transition: all var(--transition-fast);
}

.favorites-pill:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
  background: var(--bg-surface-hover);
}

.favorites-pill.is-active {
  color: #fff;
  background: var(--accent-rose-soft);
  border-color: rgba(229, 72, 97, 0.45);
}

.heart-icon {
  width: 15px;
  height: 15px;
  color: var(--accent-rose);
}

.favorites-badge {
  min-width: 22px;
  height: 20px;
  padding: 0 6px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
  font-size: 0.76rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.favorites-pill.is-active .favorites-badge {
  background: var(--accent-rose);
  color: #fff;
}

@media (max-width: 480px) {
  .favorites-label {
    display: none;
  }

  .nav-link {
    padding: 7px 11px;
    font-size: 0.88rem;
  }
}
</style>
