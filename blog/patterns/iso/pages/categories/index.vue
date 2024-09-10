<script setup>
const { data: categories } = await useFetch("/api/categories")
</script>

<template>
  <div class="container">
    <header>
      <h1>Categories</h1>
      <NuxtLink class="button" to="/categories/new">New category</NuxtLink>
    </header>

    <div class="categories">
      <NuxtLink v-for="category of categories"
                class="category"
                :to="`/categories/${category.id}`">
        <h2>{{ category.name }}</h2>
        <p>{{ category.postcount }} posts</p>
      </NuxtLink>
    </div>
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

.categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
}

@media (max-width: 650px) {
  .categories {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 450px) {
  .categories {
    grid-template-columns: repeat(1, 1fr);
  }
}

.category {
  background-color: aliceblue;
  padding: 1em;
  border-radius: 1em;
  color: black;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.category:hover {
  background-color: #d6e6f5;
}

.category:hover h2 {
  text-decoration: underline;
}

.category > * {
  margin: 0;
}

</style>
