<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getDestinationById, getRelatedDestinations } from '@/data/destinations'
import { useFavorites } from '@/composables/useFavorites'
import PlaceImage from '@/components/PlaceImage.vue'
import DestinationCard from '@/components/DestinationCard.vue'
import NotFoundState from '@/components/NotFoundState.vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const { isFavorite, toggleFavorite } = useFavorites()

const place = computed(() => getDestinationById(props.id))
const favorited = computed(() => (place.value ? isFavorite(place.value.id) : false))
const relatedPlaces = computed(() =>
  place.value ? getRelatedDestinations(place.value.id, place.value.category, 3) : []
)

function handleFavoriteToggle() {
  if (place.value) {
    toggleFavorite(place.value.id)
  }
}
</script>

<template>
  <div v-if="place" class="detail-page">
    <div class="container detail-topbar">
      <RouterLink to="/" class="back-link">
        <svg
          viewBox="0 0 20 20"
          width="17"
          height="17"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.5 10h-11m4.5-4.5L4.5 10 9 14.5" />
        </svg>
        <span>Back to destinations</span>
      </RouterLink>

      <button
        type="button"
        class="fav-action-btn"
        :class="{ 'is-favorited': favorited }"
        :aria-pressed="favorited"
        @click="handleFavoriteToggle"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          :fill="favorited ? 'currentColor' : 'none'"
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
        <span>{{ favorited ? 'Saved in Favorites' : 'Add to Favorites' }}</span>
      </button>
    </div>

    <header class="container detail-header">
      <div class="detail-header__eyebrow">
        <RouterLink
          :to="{ name: 'home', query: { category: place.category } }"
          class="detail-category-badge"
        >
          {{ place.category }}
        </RouterLink>
        <span class="detail-location-crumb">{{ place.country }} · {{ place.region }}</span>
      </div>

      <h1 class="detail-header__title">{{ place.name }}</h1>
      <p class="detail-header__tagline">{{ place.tagline }}</p>
    </header>

    <section class="container detail-hero-wrap" aria-label="Destination photograph">
      <div class="detail-hero">
        <PlaceImage
          :src="place.image"
          :alt="place.imageAlt"
          :title="place.name"
          :country="place.country"
          :category="place.category"
          priority
        />
        <div class="detail-hero__caption" aria-hidden="true">
          <span>{{ place.name }}, {{ place.country }}</span>
          <span>{{ place.coordinates }}</span>
        </div>
      </div>
    </section>

    <div class="container detail-layout">
      <article class="detail-story">
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" class="section-label">Editorial Overview</h2>
          <div class="story-prose">
            <p
              v-for="(paragraph, index) in place.description"
              :key="index"
              :class="{ 'story-prose__lead': index === 0 }"
            >
              {{ paragraph }}
            </p>
          </div>
        </section>

        <section class="facts-section" aria-labelledby="facts-heading">
          <h2 id="facts-heading" class="facts-section__title">Interesting Facts</h2>
          <ol class="facts-list">
            <li v-for="(fact, index) in place.facts" :key="index" class="facts-list__item">
              <span class="facts-list__num">{{ String(index + 1).padStart(2, '0') }}</span>
              <p class="facts-list__text">{{ fact }}</p>
            </li>
          </ol>
        </section>
      </article>

      <aside class="detail-sidebar" aria-label="Location and travel notes">
        <div class="info-card">
          <h2 class="info-card__title">Location & Field Notes</h2>

          <dl class="info-list">
            <div class="info-list__row">
              <dt>Country</dt>
              <dd>{{ place.country }}</dd>
            </div>
            <div class="info-list__row">
              <dt>Region</dt>
              <dd>{{ place.region }}</dd>
            </div>
            <div class="info-list__row">
              <dt>Category</dt>
              <dd>
                <RouterLink
                  :to="{ name: 'home', query: { category: place.category } }"
                  class="info-list__link"
                >
                  {{ place.category }}
                </RouterLink>
              </dd>
            </div>
            <div class="info-list__row">
              <dt>Coordinates</dt>
              <dd class="info-list__mono">{{ place.coordinates }}</dd>
            </div>
            <div class="info-list__row">
              <dt>Best Time to Visit</dt>
              <dd>{{ place.bestTime }}</dd>
            </div>
          </dl>

          <div class="highlights-block">
            <h3 class="highlights-block__label">Highlights</h3>
            <ul class="highlights-list">
              <li v-for="item in place.highlights" :key="item" class="highlights-list__item">
                {{ item }}
              </li>
            </ul>
          </div>

          <button
            type="button"
            class="sidebar-fav-btn"
            :class="{ 'is-favorited': favorited }"
            :aria-pressed="favorited"
            @click="handleFavoriteToggle"
          >
            <svg
              viewBox="0 0 24 24"
              width="17"
              height="17"
              :fill="favorited ? 'currentColor' : 'none'"
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
            <span>{{ favorited ? 'Remove from Favorites' : 'Save to Favorites' }}</span>
          </button>
        </div>
      </aside>
    </div>

    <section
      v-if="relatedPlaces.length > 0"
      class="container related-section"
      aria-labelledby="related-heading"
    >
      <div class="related-section__header">
        <div>
          <p class="section-label">Continue Exploring</p>
          <h2 id="related-heading" class="related-section__title">More Remarkable Places</h2>
        </div>
        <RouterLink to="/" class="related-section__all">View full catalog →</RouterLink>
      </div>

      <div class="related-grid">
        <DestinationCard v-for="item in relatedPlaces" :key="item.id" :place="item" />
      </div>
    </section>
  </div>

  <NotFoundState
    v-else
    eyebrow="Destination Unavailable"
    title="We couldn’t find that destination"
    :message="`No destination matching “${id}” exists in our Travel Places atlas. Browse the catalog to discover other remarkable places.`"
  />
</template>

<style scoped>
.detail-page {
  padding-top: clamp(1.5rem, 3.5vw, 2.5rem);
}

.detail-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--color-ink-secondary);
  padding: 0.45rem 0;
  transition: color 0.2s ease, transform 0.25s var(--ease-editorial);
}

.back-link:hover {
  color: var(--color-ink);
  transform: translateX(-3px);
}

.fav-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.58rem 1.15rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--color-ink);
  transition:
    background-color 0.22s ease,
    border-color 0.22s ease,
    color 0.22s ease,
    transform 0.22s var(--ease-editorial);
}

.fav-action-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-1px);
}

.fav-action-btn.is-favorited {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #ffffff;
}

.detail-header {
  max-width: 900px;
  margin-inline: auto;
  text-align: center;
  margin-bottom: clamp(1.75rem, 3.5vw, 2.75rem);
}

.detail-header__eyebrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.detail-category-badge {
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-pill);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.detail-category-badge:hover {
  background: var(--color-accent);
  color: #ffffff;
}

.detail-location-crumb {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
}

.detail-header__title {
  margin: 0.85rem 0 0;
  font-family: var(--font-serif);
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

.detail-header__tagline {
  margin: 1rem auto 0;
  max-width: 58ch;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.08rem, 1.8vw, 1.3rem);
  line-height: 1.55;
  color: var(--color-ink-secondary);
}

.detail-hero-wrap {
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}

.detail-hero {
  position: relative;
  aspect-ratio: 16 / 8.2;
  min-height: 280px;
  max-height: 620px;
  width: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 22px 48px rgba(28, 27, 25, 0.11);
}

.detail-hero__caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 2.25rem 1.5rem 1rem;
  background: linear-gradient(to top, rgba(20, 19, 17, 0.62), rgba(20, 19, 17, 0));
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
}

.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(290px, 0.85fr);
  gap: clamp(2rem, 5vw, 4.25rem);
  align-items: start;
}

.section-label {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.story-prose {
  margin-top: 1.15rem;
}

.story-prose p {
  margin: 0 0 1.35rem;
  font-size: 1.03rem;
  line-height: 1.85;
  color: var(--color-ink-secondary);
}

.story-prose__lead::first-letter {
  float: left;
  font-family: var(--font-serif);
  font-size: 3.35rem;
  line-height: 0.84;
  padding-right: 0.55rem;
  padding-top: 0.15rem;
  color: var(--color-ink);
  font-weight: 500;
}

.facts-section {
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
  padding-top: 2.25rem;
  border-top: 1px solid var(--color-border);
}

.facts-section__title {
  margin: 0 0 1.4rem;
  font-family: var(--font-serif);
  font-size: clamp(1.55rem, 2.8vw, 2rem);
  font-weight: 500;
  color: var(--color-ink);
}

.facts-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.facts-list__item {
  display: grid;
  grid-template-columns: 2.4rem 1fr;
  gap: 0.9rem;
  align-items: baseline;
  padding: 1.15rem 1.25rem;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.facts-list__num {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-accent);
}

.facts-list__text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-ink-secondary);
}

.detail-sidebar {
  position: sticky;
  top: calc(var(--header-height) + 1.5rem);
}

.info-card {
  padding: 1.75rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
}

.info-card__title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--color-ink);
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--color-border);
}

.info-list {
  margin: 0;
}

.info-list__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding-block: 0.85rem;
  border-bottom: 1px solid var(--color-border);
}

.info-list__row dt {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
}

.info-list__row dd {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--color-ink);
  text-align: right;
}

.info-list__mono {
  font-variant-numeric: tabular-nums;
}

.info-list__link {
  color: var(--color-accent);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.info-list__link:hover {
  border-bottom-color: currentColor;
}

.highlights-block {
  margin-top: 1.3rem;
}

.highlights-block__label {
  margin: 0 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
}

.highlights-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.highlights-list__item {
  padding: 0.36rem 0.75rem;
  border-radius: var(--radius-pill);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  font-size: 0.8rem;
  color: var(--color-ink-secondary);
}

.sidebar-fav-btn {
  margin-top: 1.65rem;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.88rem 1.25rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-ink);
  background: var(--color-ink);
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  transition:
    background-color 0.22s ease,
    border-color 0.22s ease,
    color 0.22s ease,
    transform 0.22s var(--ease-editorial);
}

.sidebar-fav-btn:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-1px);
}

.sidebar-fav-btn.is-favorited {
  background: var(--color-accent-soft);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.sidebar-fav-btn.is-favorited:hover {
  background: var(--color-accent);
  color: #ffffff;
}

.related-section {
  margin-top: clamp(3.5rem, 7vw, 5.5rem);
  padding-top: clamp(2.5rem, 5vw, 3.5rem);
  border-top: 1px solid var(--color-border);
}

.related-section__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.related-section__title {
  margin: 0.45rem 0 0;
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 500;
  color: var(--color-ink);
}

.related-section__all {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-accent);
  transition: opacity 0.2s ease;
}

.related-section__all:hover {
  opacity: 0.78;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.35rem, 2.5vw, 2rem);
}

@media (max-width: 960px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .detail-sidebar {
    position: static;
  }

  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .detail-header {
    text-align: left;
  }

  .detail-header__eyebrow {
    justify-content: flex-start;
  }

  .detail-header__tagline {
    margin-inline: 0;
  }

  .detail-hero {
    aspect-ratio: 16 / 10;
  }

  .detail-hero__caption {
    font-size: 0.7rem;
    padding: 1.5rem 1rem 0.75rem;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
