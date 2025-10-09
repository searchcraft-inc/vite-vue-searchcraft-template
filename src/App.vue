<template>
  <div id="app">
    <header class="app-header">
      <nav class="logo-nav" aria-label="Technology stack">
        <a
          href="https://vite.dev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Vite documentation"
        >
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a
          href="https://vuejs.org/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Vue.js documentation"
        >
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
        <a
          href="https://docs.searchcraft.io"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Searchcraft documentation"
        >
          <img
            src="./assets/searchcraft.svg"
            class="logo searchcraft"
            alt="Searchcraft logo"
          />
        </a>
      </nav>
      <h1 class="app-title">Vite + Vue + Searchcraft</h1>
    </header>

    <main v-if="hasEnvVars" class="main-content">
      <nav class="demo-toggle" role="tablist" aria-label="Demo mode selection">
        <button
          v-for="mode in demoModes"
          :key="mode.id"
          type="button"
          role="tab"
          :aria-selected="currentMode === mode.id"
          :aria-controls="`${mode.id}-panel`"
          @click="handleModeChange(mode.id)"
          :class="['toggle-button', { active: currentMode === mode.id }]"
        >
          {{ mode.label }}
        </button>
      </nav>

      <section
        v-if="currentMode === 'basic'"
        id="basic-panel"
        role="tabpanel"
        aria-labelledby="basic-tab"
        class="demo-panel basic-search-container"
      >
        <h2>Basic Search Example</h2>
        <div class="search-input-container">
          <SearchcraftInputForm
            :auto-search="true"
            placeholder-value="Search"
            @input-init="handleInputInit"
          />
        </div>
        <SearchcraftSearchResults :template="searchResultTemplate" />
        <p class="read-the-docs">Enter a search to get started.</p>
      </section>

      <section
        v-if="currentMode === 'advanced'"
        id="advanced-panel"
        role="tabpanel"
        aria-labelledby="advanced-tab"
        class="demo-panel"
      >
        <AdvancedSearchExample />
      </section>

      <SearchcraftTheme />
    </main>

    <WelcomeMessage v-if="!hasEnvVars" />
    <WelcomeFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  SearchcraftInputForm,
  SearchcraftSearchResults,
  SearchcraftTheme,
  type SearchcraftInputFormCustomEvent,
} from '@searchcraft/vue-sdk'
import WelcomeMessage from './components/WelcomeMessage.vue'
import WelcomeFooter from './components/WelcomeFooter.vue'
import AdvancedSearchExample from './components/AdvancedSearchExample.vue'
import { exampleSearchResultTemplate } from './searchResultTemplate'
import { useSearchcraft } from './composables/useSearchcraft'

// Types
interface DemoMode {
  readonly id: 'basic' | 'advanced'
  readonly label: string
}

// Composables
const { hasRequiredEnvVars: hasEnvVars, initializeSearchcraft, logEnvironmentConfig } = useSearchcraft()

// Reactive state
const currentMode = ref<DemoMode['id']>('basic')

// Constants
const searchResultTemplate = exampleSearchResultTemplate

const demoModes: readonly DemoMode[] = [
  { id: 'basic', label: 'Basic' },
  { id: 'advanced', label: 'Advanced' },
] as const

// Lifecycle hooks
onMounted(async () => {
  logEnvironmentConfig()

  if (!hasEnvVars.value) {
    if (import.meta.env.DEV) {
      console.warn('Missing required environment variables - Searchcraft not initialized')
    }
    return
  }

  try {
    if (import.meta.env.DEV) {
      console.log('Initializing Searchcraft...')
    }

    initializeSearchcraft()

    if (import.meta.env.DEV) {
      console.log('Searchcraft initialized successfully')
    }
  } catch (error) {
    console.error('Failed to initialize Searchcraft:', error)
  }
})

// Event handlers
const handleInputInit = (event: SearchcraftInputFormCustomEvent<void>): void => {
  if (import.meta.env.DEV) {
    console.log('Search input initialized:', event)
  }
}

const handleModeChange = (mode: DemoMode['id']): void => {
  currentMode.value = mode
}
</script>

<style scoped>
.logo {
  height: 4em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #41B883aa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.logo.searchcraft {
  /* Invert the white logo to black in light mode */
  filter: invert(1);
}

.logo.searchcraft:hover {
  filter: invert(1) drop-shadow(0 0 2em #000000aa);
}

/* In dark mode, keep the original white logo */
@media (prefers-color-scheme: dark) {
  .logo.searchcraft {
    filter: none;
  }

  .logo.searchcraft:hover {
    filter: drop-shadow(0 0 2em #ffffffaa);
  }
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

/* Layout */
.app-header {
  text-align: center;
  margin-bottom: 2rem;
}

.app-title {
  margin: 1rem 0;
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.1;
}

.logo-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-panel {
  min-height: 400px;
}

.search-input-container {
  margin-bottom: 1.25rem;
}

.read-the-docs {
  color: var(--sc-color-neutral-primary, #888);
  font-style: italic;
}

/* Demo toggle navigation */
.demo-toggle {
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Toggle buttons */
.toggle-button {
  background-color: var(--sc-color-background, #f0f0f0);
  color: var(--sc-color-foreground, #333);
  border: 1px solid var(--sc-color-neutral-secondary, #ddd);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
}

.toggle-button:hover:not(.active) {
  background-color: var(--sc-color-neutral-secondary, #e0e0e0);
  transform: translateY(-1px);
}

.toggle-button:focus-visible {
  outline: 2px solid var(--sc-color-brand, #41B883);
  outline-offset: 2px;
}

.toggle-button.active {
  background-color: var(--sc-color-brand, #41B883);
  color: white;
  border-color: var(--sc-color-brand, #41B883);
  box-shadow: 0 2px 4px rgba(65, 184, 131, 0.2);
}

/* Search container */
.basic-search-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .logo-nav {
    flex-direction: column;
    gap: 0.5rem;
  }

  .logo {
    height: 3em;
    padding: 1em;
  }

  .demo-toggle {
    flex-direction: column;
    align-items: center;
  }

  .toggle-button {
    width: 100%;
    max-width: 200px;
  }
}
</style>
