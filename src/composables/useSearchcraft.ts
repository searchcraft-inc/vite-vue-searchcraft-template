import { computed } from 'vue'
import { Searchcraft } from '@searchcraft/vue-sdk'

interface SearchcraftConfig {
  readonly indexName: string
  readonly readKey: string
  readonly endpointUrl: string
}

/**
 * Composable for managing Searchcraft configuration and initialization
 */
export function useSearchcraft() {
  // Environment variables
  const INDEX_NAME = import.meta.env.VITE_INDEX_NAME as string
  const READ_KEY = import.meta.env.VITE_READ_KEY as string
  const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL as string

  // Computed properties
  const hasRequiredEnvVars = computed((): boolean => 
    Boolean(INDEX_NAME && READ_KEY && ENDPOINT_URL)
  )

  const config = computed((): SearchcraftConfig | null => 
    hasRequiredEnvVars.value 
      ? { indexName: INDEX_NAME, readKey: READ_KEY, endpointUrl: ENDPOINT_URL }
      : null
  )

  /**
   * Initialize Searchcraft with the current configuration
   * @throws {Error} If required environment variables are missing
   */
  const initializeSearchcraft = (): void => {
    if (!hasRequiredEnvVars.value) {
      throw new Error('Missing required environment variables for Searchcraft initialization')
    }

    new Searchcraft({
      readKey: READ_KEY,
      endpointURL: ENDPOINT_URL,
      indexName: INDEX_NAME
    })
  }

  /**
   * Log environment configuration for debugging
   */
  const logEnvironmentConfig = (): void => {
    if (import.meta.env.DEV) {
      console.log('Searchcraft Environment Configuration:', {
        INDEX_NAME: INDEX_NAME || 'undefined',
        READ_KEY: READ_KEY ? `***${READ_KEY.slice(-4)}` : 'undefined',
        ENDPOINT_URL: ENDPOINT_URL || 'undefined',
        hasRequiredEnvVars: hasRequiredEnvVars.value
      })
    }
  }

  return {
    hasRequiredEnvVars,
    config,
    initializeSearchcraft,
    logEnvironmentConfig
  }
}
