<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
  { to: '/', label: 'Home', name: 'home' },
  { to: '/logs', label: 'Logs', name: 'logs' },
]

const isActive = (name: string) => route.name === name

const getNavLinkClasses = (link: (typeof navLinks)[0]) => {
  if (isActive(link.name)) {
    return 'text-cyan-400'
  }

  return 'text-gray-400 hover:text-cyan-300'
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-300 font-sans selection:bg-cyan-500/30">
    <!-- Header -->
    <header class="sticky top-0 z-10 border-b border-white/5 bg-gray-900/80 backdrop-blur-md py-4">
      <div class="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div>
            <h1 class="text-xl font-bold tracking-tight text-white m-0 leading-tight">
              SelfHosted
            </h1>

            <p class="text-xs text-gray-500 font-medium">App Template</p>
          </div>
        </div>

        <nav class="flex items-center gap-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            class="text-sm font-semibold transition-colors"
            :class="getNavLinkClasses(link)"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-6 py-10">
      <RouterView />
    </main>
  </div>
</template>
