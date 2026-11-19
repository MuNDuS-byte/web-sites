import { ref, computed } from 'vue'

const STORAGE_KEY = 'movie-explorer:favorites'

function loadInitialFavorites() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return Array.from(new Set(parsed.filter((item) => typeof item === 'string')))
  } catch {
    return []
  }
}

const favoriteIds = ref(loadInitialFavorites())

function persistFavorites(ids) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Ignore storage quota or private-mode errors gracefully
  }
}

export function useFavorites() {
  const favoritesCount = computed(() => favoriteIds.value.length)

  function isFavorite(movieId) {
    return favoriteIds.value.includes(movieId)
  }

  function toggleFavorite(movieId) {
    if (!movieId) return
    if (isFavorite(movieId)) {
      favoriteIds.value = favoriteIds.value.filter((id) => id !== movieId)
    } else {
      favoriteIds.value = [...favoriteIds.value, movieId]
    }
    persistFavorites(favoriteIds.value)
  }

  function clearFavorites() {
    favoriteIds.value = []
    persistFavorites([])
  }

  return {
    favoriteIds,
    favoritesCount,
    isFavorite,
    toggleFavorite,
    clearFavorites
  }
}
