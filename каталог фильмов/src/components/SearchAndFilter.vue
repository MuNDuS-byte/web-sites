<script setup>
import { computed } from 'vue'
import { ALL_GENRE } from '@/data/movies'

const props = defineProps({
  searchQuery: {
    type: String,
    required: true
  },
  selectedGenre: {
    type: String,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  onlyFavorites: {
    type: Boolean,
    default: false
  },
  resultCount: {
    type: Number,
    required: true
  },
  totalCount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits([
  'update:searchQuery',
  'update:selectedGenre',
  'update:onlyFavorites',
  'reset'
])

function pluralizeGenitiveFilms(count) {
  const mod100 = count % 100
  const mod10 = count % 10
  if (mod100 >= 11 && mod100 <= 19) return 'фильмов'
  if (mod10 === 1) return 'фильма'
  return 'фильмов'
}

const totalLabel = computed(() => pluralizeGenitiveFilms(props.totalCount))
const hasActiveFilters = computed(
  () => Boolean(props.searchQuery) || props.selectedGenre !== ALL_GENRE || props.onlyFavorites
)
</script>

<template>
  <section class="filter-bar" aria-label="Фильтрация фильмов">
    <div class="search-row">
      <div class="search-field">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7.5" />
          <path d="M20 20l-3.6-3.6" stroke-linecap="round" />
        </svg>

        <input
          type="search"
          class="search-input"
          :value="searchQuery"
          placeholder="Поиск фильмов по названию..."
          aria-label="Поиск фильмов по названию"
          @input="emit('update:searchQuery', $event.target.value)"
        />

        <button
          v-if="searchQuery"
          type="button"
          class="clear-btn"
          aria-label="Очистить поиск"
          @click="emit('update:searchQuery', '')"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <div class="meta-controls">
        <span class="result-counter" aria-live="polite">
          Показано <strong>{{ resultCount }}</strong> из {{ totalCount }} {{ totalLabel }}
        </span>

        <button
          v-if="hasActiveFilters"
          type="button"
          class="reset-link"
          @click="emit('reset')"
        >
          Сбросить
        </button>
      </div>
    </div>

    <div class="genre-row" role="tablist" aria-label="Фильтр по жанрам">
      <button
        v-for="genre in genres"
        :key="genre"
        type="button"
        role="tab"
        class="genre-chip"
        :class="{ 'is-selected': selectedGenre === genre }"
        :aria-selected="selectedGenre === genre"
        @click="emit('update:selectedGenre', genre)"
      >
        {{ genre }}
      </button>

      <button
        type="button"
        class="genre-chip fav-chip"
        :class="{ 'is-selected': onlyFavorites }"
        :aria-pressed="onlyFavorites"
        @click="emit('update:onlyFavorites', !onlyFavorites)"
      >
        <svg class="chip-heart" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        Избранное
      </button>
    </div>
  </section>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: var(--radius-lg);
  background: rgba(17, 21, 32, 0.72);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(12px);
}

.search-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.search-field {
  position: relative;
  flex: 1 1 320px;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 44px;
  padding: 0 42px 0 44px;
  border-radius: var(--radius-md);
  background: var(--bg-base);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  outline: none;
  border-color: rgba(245, 185, 66, 0.65);
  box-shadow: 0 0 0 3px rgba(245, 185, 66, 0.14);
}

/* Remove default WebKit search cancel icon */
.search-input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.06);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.clear-btn:hover {
  background: rgba(255, 255, 255, 0.14);
  color: var(--text-primary);
}

.clear-btn svg {
  width: 14px;
  height: 14px;
}

.meta-controls {
  display: flex;
  align-items: center;
  gap: 14px;
}

.result-counter {
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.result-counter strong {
  color: var(--text-primary);
  font-weight: 600;
}

.reset-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-gold);
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.reset-link:hover {
  background: var(--accent-gold-soft);
}

.genre-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.genre-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: var(--radius-pill);
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  transition: all var(--transition-fast);
}

.genre-chip:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.09);
  border-color: var(--border-strong);
}

.genre-chip.is-selected {
  color: #0b0d12;
  background: var(--accent-gold);
  border-color: var(--accent-gold);
  font-weight: 600;
}

.fav-chip.is-selected {
  color: #fff;
  background: var(--accent-rose);
  border-color: var(--accent-rose);
}

.chip-heart {
  width: 13px;
  height: 13px;
}

@media (max-width: 640px) {
  .filter-bar {
    padding: 16px;
  }

  .search-field {
    max-width: none;
  }
}
</style>
