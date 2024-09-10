<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { http } from "@/http.js"
import PostForm from "@/components/PostForm.vue";

const route = useRoute()
const router = useRouter()

const post = ref(await http.get("/posts/" + route.params.id))
const error = ref(null)

async function updatePost() {
  try {
    await http.patch("/posts/" + route.params.id, post.value)
    router.push({ name: "post", params: { id: route.params.id } })
  } catch (e) {
    error.value = e.message
  }
}
</script>

<template>
  <div class="container">
    <h1>Edit post</h1>

    <PostForm :post="post" :error="error" @submit.prevent="updatePost"></PostForm>
  </div>
</template>

<style scoped>
.container {
  max-width: min(600px, 100%);
  margin: auto;
}
</style>
