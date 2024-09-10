<script setup>
defineProps({
  post: { type: Object, required: true },
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-UK",
      { day: "numeric", month: "long", year: "numeric" })
}
</script>

<template>
  <NuxtLink :to="`/posts/${post.id}`" class="post">
    <h2>{{ post.title }}</h2>
    <p class="category" v-if="post.category">#{{ post.category }}</p>
    <p class="author">By <span class="name">{{ post.author }}</span></p>
    <p class="date">{{ formatDate(post.created) }}</p>
  </NuxtLink>
</template>

<style scoped>
.post {
  background-color: aliceblue;
  padding: 1em;
  border-radius: 1em;
  color: black;
  text-decoration: none;
}

.post:hover {
  background-color: #d6e6f5;
}

.post:hover h2 {
  text-decoration: underline;
}

.post h2 {
  font-size: 1.2em;
}

.post > *:first-child {
  margin-top: 0;
}

.post > *:last-child {
  margin-bottom: 0;
}
</style>
