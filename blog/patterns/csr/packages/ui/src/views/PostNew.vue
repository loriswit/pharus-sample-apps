<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import PostForm from "@/components/PostForm.vue";
import { http } from "@/http.js";

const router = useRouter()
const route = useRoute()

const post = ref({
  title: null,
  author: null,
  categoryid: route.query.category ?? "",
  content: null
})

const error = ref(null)

async function createPost() {
  try {
    const { id } = await http.post("/posts", post.value)
    router.push({ name: "post", params: { id } })
  } catch (e) {
    error.value = e.message
  }
}
</script>

<template>
  <div class="container">
    <h1>New post</h1>

    <PostForm :new-post="true" :post="post" :error="error" @submit.prevent="createPost"></PostForm>
  </div>
</template>

<style scoped>
.container {
  max-width: min(600px, 100%);
  margin: auto;
}
</style>
