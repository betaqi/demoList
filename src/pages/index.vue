<script setup>
import { works } from '../works'
</script>

<template>
  <main border-box mt30 h-screen flex flex-col select-none items-center>
    <h1>
      Demo list
    </h1>

    <div grid items-center p-2 lg:grid-cols-4 sm:grid-cols-2 lg:gap-2 sm:gap-0>
      <div
        v-for="work in works" :key="work.no"
        flex flex-col cursor-pointer text-left
        text-gray-700 dark:text-gray-400:hover:text-gray-900
        dark:hover:text-gray-100
      >
        <RouterLink :to="`/${encodeURIComponent(work.no)}`">
          <span>{{ work.no }}</span>
          {{ work.name }}
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
