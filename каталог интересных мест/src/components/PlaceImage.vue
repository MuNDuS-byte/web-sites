<script setup>
import { ref, computed, watch, useId } from 'vue'

const gradientId = useId()

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: 'Природа',
  },
  priority: {
    type: Boolean,
    default: false,
  },
})

const isLoaded = ref(false)
const hasError = ref(false)

watch(
  () => props.src,
  () => {
    isLoaded.value = false
    hasError.value = false
  }
)

const paletteMap = {
  Природа: { bg1: '#dce5df', bg2: '#7fa08c', accent: '#3f5e4d' },
  Города: { bg1: '#ede2d7', bg2: '#c59f84', accent: '#8e513b' },
  Пляжи: { bg1: '#dde8ec', bg2: '#7eb2c2', accent: '#356a7c' },
  Горы: { bg1: '#e3e4e8', bg2: '#959fad', accent: '#454e5d' },
}

const fallbackPalette = computed(() => paletteMap[props.category] || paletteMap.Природа)

function handleLoad() {
  isLoaded.value = true
}

function handleError() {
  hasError.value = true
  isLoaded.value = true
}
</script>

<template>
  <div class="place-image" :class="{ 'is-loaded': isLoaded }">
    <div v-if="!isLoaded && !hasError" class="place-image__skeleton" aria-hidden="true" />

    <img
      v-if="!hasError"
      :src="src"
      :alt="alt || title"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
      class="place-image__img"
      :class="{ 'is-visible': isLoaded }"
      @load="handleLoad"
      @error="handleError"
    />

    <div
      v-else
      class="place-image__fallback"
      role="img"
      :aria-label="alt || `Иллюстрация: ${title}`"
      :style="{
        '--fb-bg1': fallbackPalette.bg1,
        '--fb-bg2': fallbackPalette.bg2,
        '--fb-accent': fallbackPalette.accent,
      }"
    >
      <svg
        class="place-image__art"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" :stop-color="fallbackPalette.bg1" />
            <stop offset="100%" :stop-color="fallbackPalette.bg2" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" :fill="`url(#${gradientId})`" />
        <circle cx="620" cy="120" r="46" fill="rgba(255,255,255,0.42)" />
        <path
          d="M0,360 Q180,270 360,335 T800,310 L800,500 L0,500 Z"
          :fill="fallbackPalette.accent"
          opacity="0.32"
        />
        <path
          d="M0,415 Q240,340 480,395 T800,370 L800,500 L0,500 Z"
          :fill="fallbackPalette.accent"
          opacity="0.58"
        />
      </svg>
      <div class="place-image__fallback-caption">
        <span class="place-image__fallback-country">{{ country || category }}</span>
        <span class="place-image__fallback-title">{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.place-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--color-surface-muted);
}

.place-image__skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    var(--color-surface-muted) 20%,
    #f7f3ed 45%,
    var(--color-surface-muted) 70%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
}

.place-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s var(--ease-editorial), transform 0.75s var(--ease-editorial);
}

.place-image__img.is-visible {
  opacity: 1;
}

.place-image__fallback {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.place-image__art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.place-image__fallback-caption {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-md);
  background: rgba(250, 248, 245, 0.82);
  backdrop-filter: blur(8px);
  text-align: center;
}

.place-image__fallback-country {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-ink-secondary);
}

.place-image__fallback-title {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--color-ink);
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
