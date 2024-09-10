<script setup>
import { computed, ref } from "vue"
import PostTile from "./PostTile.vue"

const { posts } = defineProps(["posts"])

const years = computed(() => [...new Set(posts.map(post => post.year))])
const authors = computed(() => [...new Set(posts.map(post => post.author))].sort())

const yearFilter = ref("")
const authorFilter = ref("")

const filteredPosts = computed(() => posts.filter(post =>
    (!yearFilter.value || post.year === yearFilter.value) &&
    (!authorFilter.value || post.author === authorFilter.value)))
</script>

<template>
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
</template>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 1em;
}
</style>
