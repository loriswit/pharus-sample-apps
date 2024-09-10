<script setup>
const route = useRoute()

const { data: post } = useFetch("/api/posts/" + route.params.id)
const error = ref(null)

async function updatePost() {
  try {
    await $fetch(`/api/posts/${route.params.id}`, { method: "PATCH", body: post.value })
    navigateTo("/posts/" + route.params.id)
  } catch (e) {
    error.value = e.statusMessage
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
