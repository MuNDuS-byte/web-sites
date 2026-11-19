<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<template>
  <div class="app-shell">
    <AppNavbar />

    <main class="app-main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <footer class="app-footer">
      <div class="container footer-inner">
        <span class="footer-brand">КиноГид</span>
        <span class="footer-note">Избранный каталог кино · Локальное сохранение избранного</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
}

.app-footer {
  border-top: 1px solid var(--border-subtle);
  padding: 24px 0;
  background: rgba(9, 11, 16, 0.7);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 0.84rem;
  color: var(--text-muted);
}

.footer-brand {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--text-secondary);
}
</style>
