<script setup>
defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
  selectedCategory: {
    type: String,
    default: 'Все',
  },
  categories: {
    type: Array,
    required: true,
  },
  categoryCounts: {
    type: Object,
    default: () => ({}),
  },
  showFavoritesOnly: {
    type: Boolean,
    default: false,
  },
  favoritesCount: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits([
  'update:searchQuery',
  'update:selectedCategory',
  'update:showFavoritesOnly',
])

function clearSearch() {
  emit('update:searchQuery', '')
}
</script>

<template>
  <section class="filter-bar" aria-label="Поиск и фильтрация направлений">
    <div class="search-field">
      <svg
        class="search-field__icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path stroke-linecap="round" d="m20 20-3.5-3.5" />
      </svg>

      <label for="destination-search" class="sr-only">Поиск направлений</label>
      <input
        id="destination-search"
        type="search"
        :value="searchQuery"
        placeholder="Поиск по названию, стране или региону..."
        autocomplete="off"
        class="search-field__input"
        @input="emit('update:searchQuery', $event.target.value)"
      />

      <button
        v-if="searchQuery"
        type="button"
        class="search-field__clear"
        aria-label="Очистить поиск"
        @click="clearSearch"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <div class="filter-bar__controls">
      <div class="category-tabs" role="tablist" aria-label="Категории направлений">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          role="tab"
          :aria-selected="selectedCategory === category"
          class="category-pill"
          :class="{ 'is-active': selectedCategory === category }"
          @click="emit('update:selectedCategory', category)"
        >
          <span>{{ category }}</span>
          <span
            v-if="typeof categoryCounts[category] === 'number'"
            class="category-pill__count"
          >
            {{ categoryCounts[category] }}
          </span>
        </button>
      </div>

      <button
        type="button"
        class="saved-filter-btn"
        :class="{ 'is-active': showFavoritesOnly }"
        :aria-pressed="showFavoritesOnly"
        @click="emit('update:showFavoritesOnly', !showFavoritesOnly)"
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          :fill="showFavoritesOnly ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 20.4c-.3 0-.6-.1-.8-.3C6.1 15.8 3 12.9 3 9.2 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2.1C12.9 4.8 14.4 4 16 4c2.8 0 5 2.3 5 5.2 0 3.7-3.1 6.6-8.2 10.9-.2.2-.5.3-.8.3Z"
          />
        </svg>
        <span>Только избранное</span>
        <span class="saved-filter-btn__badge">{{ favoritesCount }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
}

.search-field {
  position: relative;
  display: flex;
  align-items: center;
}

.search-field__icon {
  position: absolute;
  left: 1.1rem;
  color: var(--color-ink-muted);
  pointer-events: none;
}

.search-field__input {
  width: 100%;
  height: 3.15rem;
  padding: 0 2.75rem 0 2.9rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  font-size: 0.95rem;
  color: var(--color-ink);
  transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
}

.search-field__input::placeholder {
  color: var(--color-ink-muted);
}

.search-field__input:hover {
  border-color: var(--color-border-strong);
}

.search-field__input:focus {
  outline: none;
  background: var(--color-surface);
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

.search-field__input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

.search-field__clear {
  position: absolute;
  right: 0.7rem;
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--color-ink-muted);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.search-field__clear:hover {
  background: var(--color-surface-muted);
  color: var(--color-ink);
}

.filter-bar__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.95rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  background: transparent;
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--color-ink-secondary);
  transition:
    background-color 0.22s ease,
    border-color 0.22s ease,
    color 0.22s ease,
    transform 0.22s var(--ease-editorial);
}

.category-pill:hover {
  border-color: var(--color-border-strong);
  color: var(--color-ink);
  background: var(--color-bg);
}

.category-pill.is-active {
  background: var(--color-ink);
  border-color: var(--color-ink);
  color: #ffffff;
}

.category-pill__count {
  font-size: 0.73rem;
  opacity: 0.72;
}

.saved-filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.95rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--color-ink-secondary);
  transition:
    background-color 0.22s ease,
    border-color 0.22s ease,
    color 0.22s ease;
}

.saved-filter-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.saved-filter-btn.is-active {
  background: var(--color-accent-soft);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.saved-filter-btn__badge {
  font-size: 0.75rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .filter-bar {
    padding: 1rem;
  }

  .filter-bar__controls {
    flex-direction: column;
    align-items: stretch;
  }

  .saved-filter-btn {
    justify-content: center;
  }
}
</style>
