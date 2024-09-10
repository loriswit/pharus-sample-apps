<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { http } from "@/http.js"
import CategoryForm from "@/components/CategoryForm.vue";

const route = useRoute()
const router = useRouter()

const category = ref(await http.get("/categories/" + route.params.id))
const error = ref(null)

async function updateCategory() {
  try {
    await http.patch("/categories/" + route.params.id, category.value)
    router.push({ name: "category", params: { id: route.params.id } })
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
