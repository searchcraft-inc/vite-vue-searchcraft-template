<template>
  <div class="advanced-search-container">
    <h2>Advanced Search Example</h2>
    <p>This component demonstrates additional Searchcraft Vue SDK features:</p>

    <div class="search-section">
      <h3>Search Input with Filters</h3>
      <SearchcraftInputForm
        :autoSearch="true"
        placeholderValue="Search with filters..."
        buttonPlacement="none"
      />

      <div class="filter-section">
        <h4 data-toggle-filter-panel>Filter Panel</h4>
        <!-- Note: If filters don't work, check that the fieldName values match your index schema -->
        <SearchcraftFilterPanel :items="filterItems" />
      </div>
    </div>

    <div class="results-section">
      <div class="results-header">
        <SearchcraftResultsInfo />
        <SearchcraftSearchResultsPerPage />
      </div>

      <SearchcraftSearchResults :template="searchResultTemplate" />

      <SearchcraftPagination />
    </div>


  </div>
</template>

<script setup lang="ts">
import {
  SearchcraftFilterPanel,
  SearchcraftInputForm,
  SearchcraftPagination,
  SearchcraftResultsInfo,
  SearchcraftSearchResults,
  SearchcraftSearchResultsPerPage,
  type DateRangeFilterItem,
  type ExactMatchToggleFilterItem,
  type FacetsFilterItem,
  type MostRecentToggleFilterItem,
  type NumericFilterItem,
} from '@searchcraft/vue-sdk'
import { onMounted } from 'vue'
import { exampleSearchResultTemplate } from '../searchResultTemplate'

const searchResultTemplate = exampleSearchResultTemplate

// Example filter items - customize these based on your index schema
// Note: Make sure the fieldName values match the actual field names in your Searchcraft index
const exactMatchItem: ExactMatchToggleFilterItem = {
  type: 'exactMatchToggle',
  label: 'Exact Match',
  options: {
    subLabel: 'Specify to use exact matching or fuzzy matching',
  },
}

const dateRangeItem: DateRangeFilterItem = {
  type: 'dateRange',
  label: 'Publication Date',
  fieldName: 'pub_date',
  options: {
    minDate: new Date('2020-01-01'),
    maxDate: new Date(),
    granularity: 'day',
  },
}

const facetItem: FacetsFilterItem = {
  type: 'facets',
  label: 'Categories',
  fieldName: 'category',
  options: {
    showSublevel: false,
  },
}

const mostRecentItem: MostRecentToggleFilterItem = {
  type: 'mostRecentToggle',
  label: 'Most Recent',
  fieldName: 'pub_date',
  options: {
    subLabel: 'Show the most recently published articles first',
  },
}

const numericItem: NumericFilterItem = {
  type: 'numericRange',
  label: 'Score Range',
  fieldName: 'score',
  options: {
    min: 0,
    max: 100,
    granularity: 10,
  },
}

const filterItems = [exactMatchItem, mostRecentItem, dateRangeItem, numericItem, facetItem]

// Debug logging to help troubleshoot filter panel issues
onMounted(() => {
  if (import.meta.env.DEV) {
    console.log('Filter Panel Configuration:', {
      filterItems,
      totalFilters: filterItems.length,
      filterTypes: filterItems.map(item => item.type),
    })

    // Check if environment variables are set
    const hasEnvVars = import.meta.env.VITE_INDEX_NAME &&
                       import.meta.env.VITE_READ_KEY &&
                       import.meta.env.VITE_ENDPOINT_URL

    if (!hasEnvVars) {
      console.warn('⚠️ Missing environment variables. Filter panel may not work without proper Searchcraft configuration.')
      console.log('Required environment variables:', {
        VITE_INDEX_NAME: import.meta.env.VITE_INDEX_NAME ? '✅ Set' : '❌ Missing',
        VITE_READ_KEY: import.meta.env.VITE_READ_KEY ? '✅ Set' : '❌ Missing',
        VITE_ENDPOINT_URL: import.meta.env.VITE_ENDPOINT_URL ? '✅ Set' : '❌ Missing',
      })
    } else {
      console.log('✅ Environment variables configured correctly')
    }
  }
})
</script>

<style scoped>
.advanced-search-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
}

.search-section {
  margin-bottom: 2rem;
}

.filter-section {
  margin-top: 1rem;
  padding: 0;
  background: transparent;
}

.filter-section h4 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

.results-section {
  margin-bottom: 2rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.results-header * {
  color: #333;
}

h2, h3, h4 {
  color: #333;
}

h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

h4 {
  margin-bottom: 0.5rem;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  h2, h3, h4 {
    color: #ffffff;
  }

  .filter-section h4 {
    color: #ffffff;
  }

  .results-header * {
    color: #ffffff;
  }
}
</style>
