import { ref, watch, onMounted } from 'vue'

type Theme = 'dark' | 'light' | 'system'

const STORAGE_KEY = 'portfolio-theme'

export function useTheme() {
  const theme = ref<Theme>('system')
  const resolvedTheme = ref<'dark' | 'light'>('dark')

  const getSystemTheme = (): 'dark' | 'light' => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const updateResolvedTheme = () => {
    const newTheme = theme.value === 'system' ? getSystemTheme() : theme.value
    resolvedTheme.value = newTheme
    
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.classList.remove('dark', 'light')
      root.classList.add(newTheme)
    }
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newTheme)
    }
    updateResolvedTheme()
  }

  const toggleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'system']
    const currentIndex = themes.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // Watch for system theme changes
  onMounted(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (saved && ['dark', 'light', 'system'].includes(saved)) {
        theme.value = saved
      }
    }
    updateResolvedTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (theme.value === 'system') {
        updateResolvedTheme()
      }
    })
  })

  watch(theme, updateResolvedTheme)

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  }
}
