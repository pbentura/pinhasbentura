<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useLenis } from './composables/useLenis'
import { useTheme } from './composables/useTheme'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'

const { initLenis, destroyLenis } = useLenis()
const { theme, resolvedTheme, setTheme } = useTheme()

onMounted(() => {
  initLenis()
})

onUnmounted(() => {
  destroyLenis()
})
</script>

<template>
  <main class="relative">
    <!-- Theme Toggle -->
    <div class="fixed top-6 right-6 z-50 flex items-center gap-2">
      <button
        @click="setTheme('dark')"
        class="p-2 rounded-full transition-all duration-300 hover:scale-110"
        :class="resolvedTheme === 'dark' ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'"
        aria-label="Thème sombre"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
      
      <button
        @click="setTheme('light')"
        class="p-2 rounded-full transition-all duration-300 hover:scale-110"
        :class="resolvedTheme === 'light' ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'"
        aria-label="Thème clair"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
      
      <button
        @click="setTheme('system')"
        class="p-2 rounded-full transition-all duration-300 hover:scale-110"
        :class="theme === 'system' ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'"
        aria-label="Thème système"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
    </div>

    <HeroSection />
    <ServicesSection />
    <ProjectsSection />
    <SkillsSection />
    <ContactSection />
  </main>
</template>
