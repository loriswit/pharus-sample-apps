<script setup>
import { computed, ref } from "vue"
import { http } from "@/http.js"
import PostTile from "@/components/PostTile.vue";

const posts = ref(await http.get("/posts"))

const years = computed(() => [...new Set(posts.value.map(post => post.year))])
const authors = computed(() => [...new Set(posts.value.map(post => post.author))].sort())

const yearFilter = ref("")
const authorFilter = ref("")

const filteredPosts = computed(() => posts.value.filter(post =>
    (!yearFilter.value || post.year === yearFilter.value) &&
    (!authorFilter.value || post.author === authorFilter.value)))

</script>

<template>
  <div class="container">
    <header>
      <h1>Posts</h1>
      <router-link class="button" :to="{ name: 'new-post' }">New post</router-link>
    </header>

    <form>
      <label>Filter by
        <select name="year" v-model="yearFilter">
          <option value="">any year</option>
          <option v-for="year in years" :value="year">{{ year }}</option>
        </select>
        <select name="author" v-model="authorFilter">
          <option value="">any author</option>
          <option v-for="author in authors" :value="author">{{ author }}</option>
        </select>
      </label>
    </form>

    <div v-if="filteredPosts.length" class="posts">
      <PostTile v-for="post in filteredPosts" :post="post"></PostTile>
    </div>

    <p v-else>No posts found</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 1em;
}
</style>
