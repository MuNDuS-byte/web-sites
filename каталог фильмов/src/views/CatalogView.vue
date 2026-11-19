<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MOVIES, GENRES, ALL_GENRE } from '@/data/movies'
import { useFavorites } from '@/composables/useFavorites'
import SearchAndFilter from '@/components/SearchAndFilter.vue'
import MovieCard from '@/components/MovieCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const { isFavorite, favoritesCount } = useFavorites()

const searchQuery = ref('')
const selectedGenre = ref(ALL_GENRE)
const onlyFavorites = ref(route.query.favorites === '1')

watch(
  () => route.query.favorites,
  (val) => {
    onlyFavorites.value = val === '1'
  }
)

function handleFavoritesToggle(nextVal) {
  onlyFavorites.value = nextVal
  const nextQuery = { ...route.query }
  if (nextVal) {
    nextQuery.favorites = '1'
  } else {
    delete nextQuery.favorites
  }
  router.replace({ name: 'catalog', query: nextQuery })
}

const filteredMovies = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return MOVIES.filter((movie) => {
    if (onlyFavorites.value && !isFavorite(movie.id)) {
      return false
    }
    if (selectedGenre.value !== ALL_GENRE && movie.genre !== selectedGenre.value) {
      return false
    }
    if (query && !movie.title.toLowerCase().includes(query)) {
      return false
    }
    return true
  })
})

const emptyStateContent = computed(() => {
  if (onlyFavorites.value && favoritesCount.value === 0) {
    return {
      title: 'В избранном пока пусто',
      description:
        'Нажмите на значок сердца на карточке или странице фильма, чтобы собрать собственную подборку.',
      actionLabel: 'Смотреть все фильмы'
    }
  }

  return {
    title: 'Фильмы не найдены',
    description:
      'Попробуйте изменить поисковый запрос или сбросить активные фильтры по жанру и избранному.',
    actionLabel: 'Сбросить фильтры'
  }
})

function resetFilters() {
  searchQuery.value = ''
  selectedGenre.value = ALL_GENRE
  if (onlyFavorites.value) {
    handleFavoritesToggle(false)
  }
}
</script>

<template>
  <div class="catalog-page container">
    <header class="catalog-hero">
      <p class="eyebrow">Избранная коллекция</p>
      <h1 class="hero-title">Откройте кино, ради которого стоит не спать.</h1>
      <p class="hero-subtitle">
        Тщательно подобранные истории в жанрах фантастики, триллера, драмы, детектива, фэнтези и анимации.
      </p>
    </header>

    <SearchAndFilter
      v-model:search-query="searchQuery"
      v-model:selected-genre="selectedGenre"
      :genres="GENRES"
      :only-favorites="onlyFavorites"
      :result-count="filteredMovies.length"
      :total-count="MOVIES.length"
      @update:only-favorites="handleFavoritesToggle"
      @reset="resetFilters"
    />

    <section class="catalog-content" aria-label="Каталог фильмов">
      <div v-if="filteredMovies.length > 0" class="movie-grid">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <EmptyState
        v-else
        :title="emptyStateContent.title"
        :description="emptyStateContent.description"
        :action-label="emptyStateContent.actionLabel"
        @action="resetFilters"
      />
    </section>
  </div>
</template>

<style scoped>
.catalog-page {
  padding-top: 38px;
  padding-bottom: 72px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.catalog-hero {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 680px;
}

.eyebrow {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent-gold);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3.6vw, 2.85rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.hero-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 560px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
  gap: 24px;
}

@media (max-width: 640px) {
  .catalog-page {
    padding-top: 26px;
    padding-bottom: 56px;
    gap: 20px;
  }

  .movie-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
}

@media (max-width: 380px) {
  .movie-grid {
    grid-template-columns: 1fr;
  }
}
</style>
