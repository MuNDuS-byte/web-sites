import { ref, computed, watch } from 'vue'
import { destinations } from '@/data/destinations'

const STORAGE_KEY = 'travel-places:favorites:v1'
const validIds = new Set(destinations.map((place) => place.id))

function loadFavorites() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return [...new Set(parsed.filter((id) => typeof id === 'string' && validIds.has(id)))]
  } catch {
    return []
  }
}

const favoriteIds = ref(loadFavorites())

watch(
  favoriteIds,
  (ids) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Ignore storage quota or private browsing errors gracefully
    }
  },
  { deep: true }
)

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      favoriteIds.value = loadFavorites()
    }
  })
}

export function useFavorites() {
  const favoritesCount = computed(() => favoriteIds.value.length)

  function isFavorite(id) {
    return favoriteIds.value.includes(id)
  }

  function toggleFavorite(id) {
    if (!validIds.has(id)) return
    if (favoriteIds.value.includes(id)) {
      favoriteIds.value = favoriteIds.value.filter((item) => item !== id)
    } else {
      favoriteIds.value = [...favoriteIds.value, id]
    }
  }

  return {
    favoriteIds,
    favoritesCount,
    isFavorite,
    toggleFavorite,
  }
}
