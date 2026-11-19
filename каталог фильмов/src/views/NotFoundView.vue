<script setup>
import { useRouter } from 'vue-router'
import EmptyState from '@/components/EmptyState.vue'

const router = useRouter()

function backToCatalog() {
  router.push({ name: 'catalog' })
}
</script>

<template>
  <div class="not-found-page container">
    <EmptyState
      title="Страница не найдена"
      description="Запрашиваемая страница не существует. Вернитесь в каталог, чтобы продолжить знакомство с фильмами."
      action-label="Вернуться в каталог"
      @action="backToCatalog"
    />
  </div>
</template>

<style scoped>
.not-found-page {
  padding-top: 64px;
  padding-bottom: 84px;
}
</style>
