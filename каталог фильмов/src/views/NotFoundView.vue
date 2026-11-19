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
      title="Page not found"
      description="The page you’re looking for doesn’t exist. Head back to the catalog to continue exploring movies."
      action-label="Back to Catalog"
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
