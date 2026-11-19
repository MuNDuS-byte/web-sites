<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMovieById, getRelatedMovies } from '@/data/movies'
import { useFavorites } from '@/composables/useFavorites'
import SafeImage from '@/components/SafeImage.vue'
import MovieCard from '@/components/MovieCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const { isFavorite, toggleFavorite } = useFavorites()

const movie = computed(() => getMovieById(route.params.id))
const favorited = computed(() => (movie.value ? isFavorite(movie.value.id) : false))
const relatedMovies = computed(() => getRelatedMovies(movie.value, 4))

watch(
  movie,
  (current) => {
    document.title = current ? `${current.title} — Movie Explorer` : 'Movie Not Found — Movie Explorer'
  },
  { immediate: true }
)

function goHome() {
  router.push({ name: 'catalog' })
}
</script>

<template>
  <div v-if="movie" class="details-page">
    <div class="backdrop-hero" aria-hidden="true">
      <SafeImage :src="movie.backdrop" :alt="''" eager class="backdrop-img" />
      <div
        class="backdrop-tint"
        :style="{ '--movie-accent': movie.accentColor }"
      />
      <div class="backdrop-fade" />
    </div>

    <div class="container details-container">
      <div class="top-bar">
        <RouterLink :to="{ name: 'catalog' }" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Back to Catalog
        </RouterLink>
      </div>

      <article class="movie-layout">
        <div class="poster-column">
          <div class="poster-frame">
            <SafeImage
              :src="movie.poster"
              :alt="`${movie.title} poster`"
              eager
            />
          </div>
        </div>

        <div class="info-column">
          <div class="meta-pills">
            <span class="genre-pill">{{ movie.genre }}</span>
            <span class="meta-pill">{{ movie.year }}</span>
            <span class="meta-pill">{{ movie.runtime }}</span>
          </div>

          <h1 class="movie-title">{{ movie.title }}</h1>
          <p v-if="movie.tagline" class="movie-tagline">“{{ movie.tagline }}”</p>

          <div class="action-row">
            <div class="rating-card" :aria-label="`Rating ${movie.rating} out of 10`">
              <svg class="rating-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span class="rating-score">{{ movie.rating.toFixed(1) }}</span>
              <span class="rating-scale">/ 10</span>
            </div>

            <button
              type="button"
              class="favorite-cta"
              :class="{ 'is-favorited': favorited }"
              :aria-pressed="favorited"
              @click="toggleFavorite(movie.id)"
            >
              <svg
                viewBox="0 0 24 24"
                :fill="favorited ? 'currentColor' : 'none'"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
              <span>{{ favorited ? 'Remove from Favorites' : 'Add to Favorites' }}</span>
            </button>
          </div>

          <div class="synopsis-block">
            <h2 class="section-label">Synopsis</h2>
            <p class="synopsis-text">{{ movie.description }}</p>
          </div>

          <dl class="credits-grid">
            <div class="credit-item">
              <dt>Director</dt>
              <dd>{{ movie.director }}</dd>
            </div>
            <div class="credit-item">
              <dt>Starring</dt>
              <dd>{{ movie.cast.join(', ') }}</dd>
            </div>
            <div class="credit-item">
              <dt>Release Year</dt>
              <dd>{{ movie.year }}</dd>
            </div>
            <div class="credit-item">
              <dt>Runtime</dt>
              <dd>{{ movie.runtime }}</dd>
            </div>
          </dl>
        </div>
      </article>

      <section v-if="relatedMovies.length" class="related-section" aria-label="More movies to explore">
        <div class="related-header">
          <h2 class="related-title">More to Explore</h2>
        </div>
        <div class="related-grid">
          <MovieCard
            v-for="item in relatedMovies"
            :key="item.id"
            :movie="item"
          />
        </div>
      </section>
    </div>
  </div>

  <div v-else class="not-found-wrap container">
    <EmptyState
      title="Movie not found"
      description="We couldn’t find a movie matching this ID. It may have been moved or removed from the catalog."
      action-label="Back to Catalog"
      @action="goHome"
    />
  </div>
</template>

<style scoped>
.details-page {
  position: relative;
  padding-bottom: 84px;
}

.backdrop-hero {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 520px;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.backdrop-img {
  opacity: 0.48;
  transform: scale(1.03);
  filter: blur(2px);
}

.backdrop-tint {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 65% 25%, color-mix(in srgb, var(--movie-accent) 26%, transparent), transparent 62%);
}

.backdrop-fade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(9, 11, 16, 0.42) 0%, rgba(9, 11, 16, 0.72) 55%, var(--bg-base) 100%),
    linear-gradient(to right, rgba(9, 11, 16, 0.8) 0%, rgba(9, 11, 16, 0.22) 55%, rgba(9, 11, 16, 0.7) 100%);
}

.details-container {
  position: relative;
  z-index: 1;
  padding-top: 28px;
}

.top-bar {
  margin-bottom: 28px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  background: rgba(17, 21, 32, 0.78);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(12px);
  transition: all var(--transition-fast);
}

.back-btn:hover {
  background: rgba(29, 36, 54, 0.92);
  border-color: var(--border-strong);
  transform: translateX(-2px);
}

.back-btn svg {
  width: 17px;
  height: 17px;
}

.movie-layout {
  display: grid;
  grid-template-columns: 310px minmax(0, 1fr);
  gap: 44px;
  align-items: start;
}

.poster-frame {
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border-strong);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.62);
}

.info-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 8px;
}

.meta-pills {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.genre-pill {
  padding: 5px 13px;
  border-radius: var(--radius-pill);
  background: var(--accent-gold-soft);
  border: 1px solid rgba(245, 185, 66, 0.35);
  color: var(--accent-gold);
  font-size: 0.82rem;
  font-weight: 600;
}

.meta-pill {
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 0.82rem;
  font-weight: 500;
}

.movie-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.movie-tagline {
  font-size: 1.06rem;
  font-style: italic;
  color: var(--text-secondary);
  margin-top: -6px;
}

.action-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 4px 0;
}

.rating-card {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  padding: 10px 18px;
  border-radius: var(--radius-md);
  background: rgba(17, 21, 32, 0.86);
  border: 1px solid var(--border-subtle);
}

.rating-star {
  width: 18px;
  height: 18px;
  color: var(--accent-gold);
  align-self: center;
}

.rating-score {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-primary);
}

.rating-scale {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.favorite-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 22px;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-weight: 600;
  color: #0b0d12;
  background: var(--accent-gold);
  border: 1px solid var(--accent-gold);
  transition: transform var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.favorite-cta svg {
  width: 18px;
  height: 18px;
}

.favorite-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(245, 185, 66, 0.25);
}

.favorite-cta.is-favorited {
  color: #fff;
  background: var(--accent-rose);
  border-color: var(--accent-rose);
}

.favorite-cta.is-favorited:hover {
  box-shadow: 0 10px 24px rgba(229, 72, 97, 0.32);
}

.synopsis-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 68ch;
}

.section-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
}

.synopsis-text {
  font-size: 1.03rem;
  line-height: 1.72;
  color: #d6dce9;
}

.credits-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 28px;
  padding: 20px;
  border-radius: var(--radius-md);
  background: rgba(17, 21, 32, 0.72);
  border: 1px solid var(--border-subtle);
  max-width: 640px;
}

.credit-item dt {
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.credit-item dd {
  font-size: 0.94rem;
  font-weight: 500;
  color: var(--text-primary);
}

.related-section {
  margin-top: 68px;
  padding-top: 36px;
  border-top: 1px solid var(--border-subtle);
}

.related-header {
  margin-bottom: 22px;
}

.related-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.not-found-wrap {
  padding-top: 64px;
  padding-bottom: 80px;
}

@media (max-width: 960px) {
  .movie-layout {
    grid-template-columns: 240px minmax(0, 1fr);
    gap: 28px;
  }

  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .movie-layout {
    grid-template-columns: 1fr;
    gap: 26px;
  }

  .poster-column {
    max-width: 240px;
  }

  .credits-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .favorite-cta {
    width: 100%;
    justify-content: center;
  }

  .related-grid {
    gap: 14px;
  }
}
</style>
