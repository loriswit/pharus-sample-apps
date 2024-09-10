<script setup>
const route = useRoute()

const { data: category } = await useFetch("/api/categories/" + route.params.id)

async function deleteCategory() {
  if (confirm("Are you sure you want to delete this category and all its posts? (No undo)")) {
    await $fetch("/api/categories/" + route.params.id, { method: "DELETE" })
    navigateTo("/categories")
  }
}
</script>

<template>
  <div class="container">
    <header>
      <h1>Category: {{ category.name }}</h1>
      <div class="actions">
        <NuxtLink class="button"
                  :to="`/posts/new?category=${category.id}`">New post
        </NuxtLink>
        <NuxtLink class="button"
                  :to="`/categories/${category.id}/edit`">
          Edit category
        </NuxtLink>
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
