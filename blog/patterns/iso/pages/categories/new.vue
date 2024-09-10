<script setup>
const category = ref({ name: null })
const error = ref(null)

async function createCategory() {
  try {
    const { id } = await $fetch("/api/categories", { method: "POST", body: category.value })
    navigateTo("/categories/" + id)
  } catch (e) {
    error.value = e.statusMessage
  }
}
</script>

<template>
  <div class="container">
    <h1>New category</h1>

    <CategoryForm :new-category="true" :category="category"
                  :error="error" @submit.prevent="createCategory"/>
  </div>
</template>

<style scoped>
.container {
  max-width: min(600px, 100%);
  margin: auto;
}
</style>
