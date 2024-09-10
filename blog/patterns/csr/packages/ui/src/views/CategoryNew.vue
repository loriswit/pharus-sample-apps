<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { http } from "@/http.js";
import CategoryForm from "@/components/CategoryForm.vue";

const router = useRouter()

const category = ref({ name: null })
const error = ref(null)

async function createCategory() {
  try {
    const { id } = await http.post("/categories", category.value)
    router.push({ name: "category", params: { id } })
  } catch (e) {
    error.value = e.message
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
