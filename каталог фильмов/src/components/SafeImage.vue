<script setup>
import { ref, watch, onMounted } from 'vue'
import { FALLBACK_POSTER } from '@/data/movies'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  fallback: {
    type: String,
    default: FALLBACK_POSTER
  },
  eager: {
    type: Boolean,
    default: false
  }
})

const imgRef = ref(null)
const currentSrc = ref(props.src || props.fallback)
const isLoaded = ref(false)

onMounted(() => {
  if (imgRef.value && imgRef.value.complete && imgRef.value.naturalWidth > 0) {
    isLoaded.value = true
  }
})

watch(
  () => props.src,
  (nextSrc) => {
    currentSrc.value = nextSrc || props.fallback
    isLoaded.value = false
  }
)

function handleError() {
  if (currentSrc.value !== props.fallback) {
    currentSrc.value = props.fallback
  }
  isLoaded.value = true
}

function handleLoad() {
  isLoaded.value = true
}
</script>

<template>
  <img
    ref="imgRef"
    :src="currentSrc"
    :alt="alt"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
    class="safe-image"
    :class="{ 'is-loaded': isLoaded }"
    @error="handleError"
    @load="handleLoad"
  />
</template>

<style scoped>
.safe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 280ms ease;
}

.safe-image.is-loaded {
  opacity: 1;
}
</style>
