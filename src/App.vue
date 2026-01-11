<script setup lang="ts">
import TodoContainer from './components/TodoContainer.vue';
</script>

<template>
  <v-layout>
    <v-app-bar height="100" flat class="app-bar-layout">
      TODO APP
    </v-app-bar>
    <v-main style="max-width: max-content;">
      <TodoContainer></TodoContainer>
    </v-main>
  </v-layout>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 1rem;
}

.app-bar-layout {
  padding: 0 2rem;
  font-size: 1.5rem;
  font-weight: bold;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
