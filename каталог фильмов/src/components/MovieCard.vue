<script setup>
import { computed } from 'vue'
import SafeImage from '@/components/SafeImage.vue'
import { useFavorites } from '@/composables/useFavorites'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const { isFavorite, toggleFavorite } = useFavorites()
const favorited = computed(() => isFavorite(props.movie.id))
</script>

<template>
  <article class="movie-card">
    <RouterLink :to="{ name: 'movie-details', params: { id: movie.id } }" class="card-link">
      <div class="poster-wrap">
        <SafeImage
          :src="movie.poster"
          :alt="`${movie.title} poster`"
          class="poster-img"
        />

        <span class="rating-badge" :aria-label="`Rating ${movie.rating} out of 10`">
          <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {{ movie.rating.toFixed(1) }}
        </span>

        <button
          type="button"
          class="fav-btn"
          :class="{ 'is-favorited': favorited }"
          :aria-pressed="favorited"
          :aria-label="favorited ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`"
          @click.prevent.stop="toggleFavorite(movie.id)"
        >
          <svg viewBox="0 0 24 24" :fill="favorited ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
        </button>

        <div class="poster-overlay" aria-hidden="true">
          <span class="cta-pill">
            View details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      <div class="card-body">
        <h3 class="card-title">{{ movie.title }}</h3>
        <div class="card-meta">
          <span class="meta-year">{{ movie.year }}</span>
          <span class="meta-dot" aria-hidden="true">·</span>
          <span class="meta-genre">{{ movie.genre }}</span>
        </div>
      </div>
    </RouterLink>
  </article>
</template>

<style scoped>
.movie-card {
  position: relative;
  border-radius: var(--radius-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition:
    transform var(--transition-smooth),
    border-color var(--transition-smooth),
    box-shadow var(--transition-smooth);
}

.movie-card:hover {
  transform: translateY(-6px);
  border-color: rgba(245, 185, 66, 0.35);
  box-shadow: var(--shadow-card-hover);
}

.card-link {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.poster-wrap {
  position: relative;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background: var(--bg-surface);
}

.poster-img {
  transition: transform 480ms cubic-bezier(0.22, 1, 0.36, 1);
}

.movie-card:hover .poster-img {
  transform: scale(1.06);
}

.rating-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border-radius: var(--radius-pill);
  background: rgba(9, 11, 16, 0.76);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-primary);
}

.star-icon {
  width: 12px;
  height: 12px;
  color: var(--accent-gold);
}

.fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(9, 11, 16, 0.68);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  transition: transform var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
}

.fav-btn svg {
  width: 16px;
  height: 16px;
}

.fav-btn:hover {
  transform: scale(1.1);
  background: rgba(9, 11, 16, 0.9);
  border-color: rgba(255, 255, 255, 0.3);
}

.fav-btn.is-favorited {
  color: #fff;
  background: var(--accent-rose);
  border-color: var(--accent-rose);
}

.poster-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 16px;
  background: linear-gradient(to top, rgba(9, 11, 16, 0.92) 0%, rgba(9, 11, 16, 0.25) 45%, transparent 100%);
  opacity: 0;
  transition: opacity var(--transition-smooth);
}

.movie-card:hover .poster-overlay,
.card-link:focus-visible .poster-overlay {
  opacity: 1;
}

.cta-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.82rem;
  font-weight: 600;
  color: #fff;
  transform: translateY(8px);
  transition: transform var(--transition-smooth);
}

.movie-card:hover .cta-pill,
.card-link:focus-visible .cta-pill {
  transform: translateY(0);
}

.cta-pill svg {
  width: 14px;
  height: 14px;
}

.card-body {
  padding: 14px 15px 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.82rem;
  color: var(--text-secondary);
}

.meta-dot {
  color: var(--text-muted);
}

.meta-genre {
  color: var(--accent-gold);
  font-weight: 500;
}
</style>
