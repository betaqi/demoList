<script setup>
import { watch } from 'vue'

const title = ref('my title')
const count = ref(0)
function setTitle() {
  count.value++
  title.value = `new title ${count.value}`
}

useTitle(() => count.value % 2 === 0 ? 'even' : 'odd')
function useTitle(newTitle) {
  watch(newTitle, (t) => {
    document.title = t
  })
}
</script>

<template>
  <button @click="setTitle">
    change title
  </button>
</template>
