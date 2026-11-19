<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'

const route = useRoute()
const router = useRouter()
const { favoritesCount } = useFavorites()

const isShowingFavorites = computed(
  () => route.name === 'home' && route.query.favorites === 'true'
)

function handleFavoritesClick() {
  if (route.name === 'home') {
    const nextQuery = { ...route.query }
    if (nextQuery.favorites === 'true') {
      delete nextQuery.favorites
    } else {
      nextQuery.favorites = 'true'
    }
    router.replace({ name: 'home', query: nextQuery })
  } else {
    router.push({ name: 'home', query: { favorites: 'true' } })
  }
}

function handleExploreClick() {
  if (route.name === 'home' && Object.keys(route.query).length > 0) {
    router.replace({ name: 'home', query: {} })
  }
}
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <RouterLink to="/" class="brand" aria-label="Travel Places Home" @click="handleExploreClick">
        <span class="brand__mark" aria-hidden="true">
          <svg viewBox="0 0 28 28" width="26" height="26" fill="none">
            <circle cx="14" cy="14" r="12.5" stroke="currentColor" stroke-width="1.25" />
            <path d="M14 5.2L16.7 14L14 22.8L11.3 14L14 5.2Z" fill="var(--color-accent)" />
            <circle cx="14" cy="14" r="1.6" fill="var(--color-bg)" />
          </svg>
        </span>
        <span class="brand__text">
          <span class="brand__title">Travel Places</span>
          <span class="brand__subtitle">World Journal</span>
        </span>
      </RouterLink>

      <nav class="site-nav" aria-label="Main navigation">
        <RouterLink
          to="/"
          class="nav-link"
          :class="{ 'is-active': route.name === 'home' && !isShowingFavorites }"
          @click="handleExploreClick"
        >
          Destinations
        </RouterLink>

        <button
          type="button"
          class="favorites-pill"
          :class="{ 'is-active': isShowingFavorites }"
          :aria-pressed="isShowingFavorites"
          aria-label="Toggle saved destinations"
          @click="handleFavoritesClick"
        >
          <svg
            class="favorites-pill__icon"
            viewBox="0 0 24 24"
            width="15"
            height="15"
            :fill="isShowingFavorites || favoritesCount > 0 ? 'currentColor' : 'none'"
            stroke="currentColor"
            stroke-width="1.9"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 20.4c-.3 0-.6-.1-.8-.3C6.1 15.8 3 12.9 3 9.2 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2.1C12.9 4.8 14.4 4 16 4c2.8 0 5 2.3 5 5.2 0 3.7-3.1 6.6-8.2 10.9-.2.2-.5.3-.8.3Z"
            />
          </svg>
          <span>Saved</span>
          <span class="favorites-pill__count">{{ favoritesCount }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  height: var(--header-height);
  background: rgba(250, 248, 245, 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-ink);
  transition: opacity 0.25s ease;
}

.brand:hover {
  opacity: 0.85;
}

.brand__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.55s var(--ease-editorial);
}

.brand:hover .brand__mark {
  transform: rotate(35deg);
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand__title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.brand__subtitle {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
  margin-top: 0.15rem;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-ink-secondary);
  padding: 0.35rem 0;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--color-ink);
}

.nav-link.is-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1.5px;
  background-color: var(--color-accent);
}

.favorites-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.48rem 0.9rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--color-ink);
  transition:
    border-color 0.22s ease,
    background-color 0.22s ease,
    color 0.22s ease,
    transform 0.22s var(--ease-editorial);
}

.favorites-pill:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-1px);
}

.favorites-pill.is-active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #ffffff;
}

.favorites-pill__icon {
  color: var(--color-accent);
  transition: color 0.2s ease;
}

.favorites-pill.is-active .favorites-pill__icon {
  color: #ffffff;
}

.favorites-pill__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.3rem;
  height: 1.3rem;
  padding-inline: 0.32rem;
  border-radius: var(--radius-pill);
  background: var(--color-surface-muted);
  color: var(--color-ink);
  font-size: 0.72rem;
  font-weight: 600;
}

.favorites-pill.is-active .favorites-pill__count {
  background: rgba(255, 255, 255, 0.22);
  color: #ffffff;
}

@media (max-width: 560px) {
  .brand__subtitle {
    display: none;
  }

  .site-nav {
    gap: 0.85rem;
  }

  .nav-link {
    font-size: 0.82rem;
  }

  .favorites-pill {
    padding: 0.42rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>
