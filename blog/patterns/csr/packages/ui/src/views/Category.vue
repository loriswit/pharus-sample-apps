<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { http } from "@/http.js"
import PostTile from "@/components/PostTile.vue";

const route = useRoute()
const router = useRouter()

const category = ref(await http.get("/categories/" + route.params.id))

async function deleteCategory() {
  if (confirm("Are you sure you want to delete this category and all its posts? (No undo)")) {
    await http.delete("/categories/" + route.params.id)
    router.push({ name: "categories" })
  }
}
</script>

<template>
  <div class="container">
    <header>
      <h1>Category: {{ category.name }}</h1>
      <div class="actions">
        <router-link class="button"
                     :to="{name: 'new-post', query: {category: category.id}}">New post</router-link>
        <router-link class="button"
                     :to="{name: 'edit-category', params: {id: category.id}}">
          Edit category
        </router-link>
        <button @click="deleteCategory">Delete category</button>
      </div>
    </header>

    <div v-if="category.posts.length" class="posts">
      <PostTile v-for="post in category.posts" :post="post"></PostTile>
    </div>

    <p v-else>No posts in this category yet</p>
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

.actions {
  display: flex;
  gap: 0.25em;
}
</style>
