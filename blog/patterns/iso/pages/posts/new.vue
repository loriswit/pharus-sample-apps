<script setup>
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
    const { id } = await $fetch("/api/posts", { method: "POST", body: post.value })
    navigateTo("/posts/" + id)
  } catch (e) {
    error.value = e.statusMessage
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
