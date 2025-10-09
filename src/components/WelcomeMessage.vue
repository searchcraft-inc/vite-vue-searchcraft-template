<template>
  <section style="max-width: 700px">
    <div class="welcome-placeholder">
      Search components will render here when .env variables are added.
    </div>

    <div class="welcome-message">
      <p class="welcome-title">
        🛰️ Welcome, pilot — we're glad to have you aboard.
      </p>
      <p class="welcome-body">
        To begin your mission, you'll need a search index. Head to
        <a
          href="https://vektron.searchcraft.io"
          target="_blank"
          rel="noopener noreferrer"
          class="welcome-link"
        >
          Vektron ↗︎
        </a>
        , your command center for creating and configuring indexes, managing
        settings, and navigating all things Searchcraft.
      </p>
      <p>
        Once your index is configured, add an .env file in this project's root
        with the variables from Vektron.
      </p>

      <pre
        style="
          background-color: #1b1b1b;
          padding: 1rem;
          border-radius: 10px;
        "
      >VITE_ENDPOINT_URL= 
VITE_INDEX_NAME= 
VITE_READ_KEY=</pre>
      <p>Now, go forth and query!</p>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for this component
</script>
