<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { destinations, CATEGORIES } from '@/data/destinations'
import { useFavorites } from '@/composables/useFavorites'
import FilterBar from '@/components/FilterBar.vue'
import DestinationCard from '@/components/DestinationCard.vue'

const route = useRoute()
const router = useRouter()
const { favoriteIds, favoritesCount } = useFavorites()

function normalizeCategory(value) {
  return CATEGORIES.includes(value) ? value : 'Все'
}

function pluralizeDestinations(count) {
  const mod100 = count % 100
  const mod10 = count % 10
  if (mod100 >= 11 && mod100 <= 14) return 'направлений'
  if (mod10 === 1) return 'направление'
  if (mod10 >= 2 && mod10 <= 4) return 'направления'
  return 'направлений'
}

const searchQuery = ref(typeof route.query.q === 'string' ? route.query.q : '')
const selectedCategory = ref(normalizeCategory(route.query.category))
const showFavoritesOnly = ref(route.query.favorites === 'true')

watch(
  () => route.query,
  (query) => {
    const nextCategory = normalizeCategory(query.category)
    const nextFavorites = query.favorites === 'true'
    const nextSearch = typeof query.q === 'string' ? query.q : ''

    if (selectedCategory.value !== nextCategory) {
      selectedCategory.value = nextCategory
    }
    if (showFavoritesOnly.value !== nextFavorites) {
      showFavoritesOnly.value = nextFavorites
    }
    if (searchQuery.value !== nextSearch) {
      searchQuery.value = nextSearch
    }
  }
)

function syncQuery() {
  const nextQuery = {}
  const trimmed = searchQuery.value.trim()
  if (trimmed) nextQuery.q = trimmed
  if (selectedCategory.value !== 'Все') nextQuery.category = selectedCategory.value
  if (showFavoritesOnly.value) nextQuery.favorites = 'true'

  const currentQ = typeof route.query.q === 'string' ? route.query.q : undefined
  const currentCat = typeof route.query.category === 'string' ? route.query.category : undefined
  const currentFav = route.query.favorites === 'true' ? 'true' : undefined

  if (
    nextQuery.q !== currentQ ||
    nextQuery.category !== currentCat ||
    nextQuery.favorites !== currentFav
  ) {
    router.replace({ name: 'home', query: nextQuery })
  }
}

watch([selectedCategory, showFavoritesOnly], () => {
  syncQuery()
})

watch(searchQuery, () => {
  syncQuery()
})

const baseFilteredDestinations = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return destinations.filter((place) => {
    if (showFavoritesOnly.value && !favoriteIds.value.includes(place.id)) {
      return false
    }

    if (!query) return true

    const searchableText = [
      place.name,
      place.country,
      place.region,
      place.category,
      place.shortDescription,
      place.tagline,
    ]
      .join(' ')
      .toLowerCase()

    return searchableText.includes(query)
  })
})

const categoryCounts = computed(() => {
  const counts = { Все: baseFilteredDestinations.value.length }
  for (const category of CATEGORIES) {
    if (category === 'Все') continue
    counts[category] = baseFilteredDestinations.value.filter(
      (place) => place.category === category
    ).length
  }
  return counts
})

const filteredDestinations = computed(() => {
  if (selectedCategory.value === 'Все') {
    return baseFilteredDestinations.value
  }
  return baseFilteredDestinations.value.filter(
    (place) => place.category === selectedCategory.value
  )
})

const hasActiveFilters = computed(
  () =>
    searchQuery.value.trim().length > 0 ||
    selectedCategory.value !== 'Все' ||
    showFavoritesOnly.value
)

const resultsSummary = computed(() => {
  const count = filteredDestinations.value.length
  const noun = pluralizeDestinations(count)
  const parts = [`Показано ${count} ${noun}`]

  if (selectedCategory.value !== 'Все') {
    parts.push(`в категории «${selectedCategory.value}»`)
  }
  if (showFavoritesOnly.value) {
    parts.push('из вашего избранного')
  }
  if (searchQuery.value.trim()) {
    parts.push(`по запросу «${searchQuery.value.trim()}»`)
  }
  return parts.join(' ')
})

function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'Все'
  showFavoritesOnly.value = false
}
</script>

<template>
  <div class="home-page">
    <section class="hero container">
      <p class="hero__kicker">
        Атлас путешествий · {{ destinations.length }} знаковых мест планеты
      </p>
      <h1 class="hero__title">
        Откройте удивительные уголки<br class="hero__break" />
        по всему миру.
      </h1>
      <p class="hero__subtitle">
        От тихих ледниковых долин и альпийских вершин до солнечных прибрежных городков и древних столиц — исследуйте наш редакционный гид по самым красивым местам Земли.
      </p>
    </section>

    <div class="container catalog-controls">
      <FilterBar
        v-model:search-query="searchQuery"
        v-model:selected-category="selectedCategory"
        v-model:show-favorites-only="showFavoritesOnly"
        :categories="CATEGORIES"
        :category-counts="categoryCounts"
        :favorites-count="favoritesCount"
      />

      <div class="results-bar">
        <p class="results-bar__text" aria-live="polite">{{ resultsSummary }}</p>
        <button
          v-if="hasActiveFilters"
          type="button"
          class="results-bar__reset"
          @click="resetFilters"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>

    <section class="container catalog-section" aria-label="Каталог направлений">
      <TransitionGroup
        v-if="filteredDestinations.length > 0"
        name="grid-card"
        tag="div"
        class="destinations-grid"
      >
        <DestinationCard
          v-for="place in filteredDestinations"
          :key="place.id"
          :place="place"
        />
      </TransitionGroup>

      <div v-else class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="42" height="42" fill="none" stroke="currentColor" stroke-width="1.4">
            <circle cx="24" cy="24" r="19" />
            <path d="M24 13v22M13 24h22" stroke-dasharray="2 3" opacity="0.55" />
            <circle cx="24" cy="24" r="4" fill="var(--color-accent-soft)" stroke="var(--color-accent)" />
          </svg>
        </div>

        <h2 class="empty-state__title">
          {{
            showFavoritesOnly && favoritesCount === 0
              ? 'Список избранного пока пуст'
              : 'По вашему запросу ничего не найдено'
          }}
        </h2>

        <p class="empty-state__text">
          {{
            showFavoritesOnly && favoritesCount === 0
              ? 'Нажмите на значок сердца на карточке или странице направления, чтобы сохранить понравившиеся места для будущих поездок.'
              : 'Попробуйте изменить поисковый запрос или выбрать другую категорию ландшафтов.'
          }}
        </p>

        <button type="button" class="empty-state__btn" @click="resetFilters">
          Показать все направления
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  padding-top: clamp(2.25rem, 5vw, 4rem);
}

.hero {
  max-width: 820px;
  margin-inline: auto;
  text-align: center;
  margin-bottom: clamp(2rem, 4.5vw, 3.25rem);
}

.hero__kicker {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.hero__title {
  margin: 0.85rem 0 0;
  font-family: var(--font-serif);
  font-size: clamp(2.1rem, 4.8vw, 3.35rem);
  font-weight: 500;
  line-height: 1.14;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

.hero__subtitle {
  margin: 1.15rem auto 0;
  max-width: 58ch;
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  color: var(--color-ink-secondary);
  line-height: 1.7;
}

.catalog-controls {
  margin-bottom: 1.85rem;
}

.results-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.15rem;
  padding-inline: 0.25rem;
}

.results-bar__text {
  margin: 0;
  font-size: 0.86rem;
  color: var(--color-ink-muted);
}

.results-bar__reset {
  border: none;
  background: transparent;
  padding: 0.25rem 0;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--color-accent);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.results-bar__reset:hover {
  color: var(--color-accent-hover);
  border-bottom-color: currentColor;
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.35rem, 2.5vw, 2rem);
}

.grid-card-enter-active,
.grid-card-leave-active {
  transition: opacity 0.32s var(--ease-editorial), transform 0.32s var(--ease-editorial);
}

.grid-card-enter-from,
.grid-card-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.985);
}

.empty-state {
  max-width: 520px;
  margin: 2.5rem auto 1rem;
  padding: 3rem 2rem;
  text-align: center;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
}

.empty-state__icon {
  display: inline-flex;
  color: var(--color-ink-muted);
  margin-bottom: 1rem;
}

.empty-state__title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.55rem;
  font-weight: 500;
  color: var(--color-ink);
}

.empty-state__text {
  margin: 0.7rem auto 0;
  max-width: 40ch;
  font-size: 0.93rem;
  color: var(--color-ink-secondary);
}

.empty-state__btn {
  margin-top: 1.5rem;
  padding: 0.72rem 1.45rem;
  border-radius: var(--radius-pill);
  border: none;
  background: var(--color-ink);
  color: #ffffff;
  font-size: 0.87rem;
  font-weight: 500;
  transition: background-color 0.22s ease, transform 0.22s var(--ease-editorial);
}

.empty-state__btn:hover {
  background: var(--color-accent);
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .destinations-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .hero {
    text-align: left;
  }

  .hero__break {
    display: none;
  }

  .hero__subtitle {
    margin-inline: 0;
  }

  .destinations-grid {
    grid-template-columns: 1fr;
  }
}
</style>
