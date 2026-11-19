<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  actionLabel: {
    type: String,
    default: ''
  }
})

defineEmits(['action'])
</script>

<template>
  <div class="empty-state" role="status">
    <div class="empty-icon" aria-hidden="true">
      <slot name="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor" stroke="none" />
        </svg>
      </slot>
    </div>

    <h2 class="empty-title">{{ title }}</h2>
    <p class="empty-description">{{ description }}</p>

    <button
      v-if="actionLabel"
      type="button"
      class="empty-action"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 64px 24px;
  border-radius: var(--radius-lg);
  background: rgba(17, 21, 32, 0.6);
  border: 1px solid var(--border-subtle);
}

.empty-icon {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-gold-soft);
  color: var(--accent-gold);
  margin-bottom: 18px;
}

.empty-icon svg {
  width: 28px;
  height: 28px;
}

.empty-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-description {
  max-width: 440px;
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.empty-action {
  padding: 10px 22px;
  border-radius: var(--radius-pill);
  background: var(--accent-gold);
  color: #0b0d12;
  font-size: 0.92rem;
  font-weight: 600;
  transition: transform var(--transition-fast), filter var(--transition-fast);
}

.empty-action:hover {
  transform: translateY(-1px);
  filter: brightness(1.06);
}
</style>
