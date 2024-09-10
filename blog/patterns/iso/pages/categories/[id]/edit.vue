<script setup>
const route = useRoute()

const { data: category } = await useFetch("/api/categories/" + route.params.id)
const error = ref(null)

async function updateCategory() {
  try {
    await $fetch("/api/categories/" + route.params.id, { method: "PATCH", body: category.value })
    navigateTo("/categories/" + route.params.id)
  } catch (e) {
    error.value = e.message
  }
}
</script>

<template>
  <div class="container">
    <h1>Edit category</h1>

    <CategoryForm :category="category" :error="error" @submit.prevent="updateCategory"></CategoryForm>
  </div>
</template>

<style scoped>
.container {
  max-width: min(600px, 100%);
  margin: auto;
}
</style>
