<script setup lang="ts">
import LogViewer from '@/components/logs/LogViewer.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-300 font-sans selection:bg-cyan-500/30">
    <!-- Header -->
    <header class="sticky top-0 z-10 border-b border-white/5 bg-gray-900/80 backdrop-blur-md py-4">
      <div class="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20"
          >
            <span class="text-xl">🚀</span>
          </div>

          <div>
            <h1 class="text-xl font-bold tracking-tight text-white m-0 leading-tight">
              Self-Hosted App
            </h1>

            <p class="text-xs text-gray-500 font-medium">Control Center • V1.0.0</p>
          </div>
        </div>

        <nav class="hidden md:flex items-center gap-6">
          <a
            href="/"
            class="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Logs
          </a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-6 py-10">
      <div class="mb-10">
        <h2 class="text-3xl font-extrabold text-white mb-2 tracking-tight">System Logs</h2>

        <p class="text-gray-400 max-w-2xl">
          Real-time monitoring of application events, errors, and system health. Filter by level or
          search through historical data.
        </p>
      </div>

      <LogViewer />
    </main>
  </div>
</template>
