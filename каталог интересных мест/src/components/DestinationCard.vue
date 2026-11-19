<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import PlaceImage from '@/components/PlaceImage.vue'
import { useFavorites } from '@/composables/useFavorites'

const props = defineProps({
  place: {
    type: Object,
    required: true,
  },
})

const { isFavorite, toggleFavorite } = useFavorites()

const favorited = computed(() => isFavorite(props.place.id))

function handleToggleFavorite() {
  toggleFavorite(props.place.id)
}
</script>

<template>
  <article class="destination-card">
    <RouterLink :to="{ name: 'place-detail', params: { id: place.id } }" class="destination-card__link">
      <div class="destination-card__media">
        <PlaceImage
          :src="place.image"
          :alt="place.imageAlt"
          :title="place.name"
          :country="place.country"
          :category="place.category"
        />

        <span class="destination-card__category">{{ place.category }}</span>

        <button
          type="button"
          class="destination-card__fav"
          :class="{ 'is-favorited': favorited }"
          :aria-pressed="favorited"
          :aria-label="
            favorited
              ? `Remove ${place.name} from favorites`
              : `Add ${place.name} to favorites`
          "
          @click.prevent.stop="handleToggleFavorite"
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
        </button>
      </div>

      <div class="destination-card__body">
        <div class="destination-card__meta">
          <span class="destination-card__country">{{ place.country }}</span>
          <span class="destination-card__dot" aria-hidden="true">·</span>
          <span class="destination-card__region">{{ place.region }}</span>
        </div>

        <h2 class="destination-card__title">{{ place.name }}</h2>

        <p class="destination-card__description">{{ place.shortDescription }}</p>

        <div class="destination-card__footer">
          <span class="destination-card__cta">
            Read guide
            <svg
              class="destination-card__arrow"
              viewBox="0 0 20 20"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10h11m-4.5-4.5L15.5 10 11 14.5" />
            </svg>
          </span>
        </div>
      </div>
    </RouterLink>
  </article>
</template>

<style scoped>
.destination-card {
  height: 100%;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition:
    transform 0.45s var(--ease-editorial),
    box-shadow 0.45s var(--ease-editorial),
    border-color 0.3s ease;
}

.destination-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-border-strong);
}

.destination-card__link {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.destination-card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.destination-card:hover :deep(.place-image__img) {
  transform: scale(1.055);
}

.destination-card__category {
  position: absolute;
  top: 0.95rem;
  left: 0.95rem;
  z-index: 2;
  padding: 0.3rem 0.72rem;
  border-radius: var(--radius-pill);
  background: rgba(250, 248, 245, 0.9);
  backdrop-filter: blur(8px);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink);
}

.destination-card__fav {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 2;
  width: 2.35rem;
  height: 2.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: rgba(250, 248, 245, 0.92);
  backdrop-filter: blur(8px);
  color: var(--color-ink-secondary);
  box-shadow: 0 4px 12px rgba(28, 27, 25, 0.12);
  transition:
    transform 0.25s var(--ease-editorial),
    background-color 0.2s ease,
    color 0.2s ease;
}

.destination-card__fav:hover {
  transform: scale(1.08);
  background: #ffffff;
  color: var(--color-accent);
}

.destination-card__fav.is-favorited {
  background: var(--color-accent);
  color: #ffffff;
}

.destination-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.35rem 1.45rem 1.45rem;
}

.destination-card__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
}

.destination-card__country {
  color: var(--color-accent);
}

.destination-card__title {
  margin: 0.45rem 0 0;
  font-family: var(--font-serif);
  font-size: 1.42rem;
  font-weight: 500;
  line-height: 1.22;
  letter-spacing: -0.01em;
  color: var(--color-ink);
  transition: color 0.25s ease;
}

.destination-card:hover .destination-card__title {
  color: var(--color-accent);
}

.destination-card__description {
  margin: 0.65rem 0 0;
  font-size: 0.915rem;
  line-height: 1.6;
  color: var(--color-ink-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.destination-card__footer {
  margin-top: auto;
  padding-top: 1.1rem;
}

.destination-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--color-ink);
}

.destination-card__arrow {
  transition: transform 0.3s var(--ease-editorial);
}

.destination-card:hover .destination-card__arrow {
  transform: translateX(4px);
}
</style>
