<script setup>
defineProps({
  post: { type: Object, required: true },
  newPost: { type: Boolean, default: false },
  error: { type: String, default: null },
})

const { data: categories } = await useFetch("/api/categories")
</script>

<template>
  <form>
    <p v-if="error" class="error">{{ error }}</p>
    <label>
      Post title
      <input type="text" required minlength="1" autofocus v-model="post.title">
    </label>
    <label>
      Author name
      <input type="text" required minlength="1" v-model="post.author">
    </label>
    <label>
      Category
      <select v-model="post.categoryid" required>
        <option v-if="newPost" disabled selected value> -- please select --</option>
        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
      </select>
    </label>
    <label>
      Body
      <textarea rows="16" required minlength="1" v-model="post.content"></textarea>
    </label>
    <button type="submit">{{ newPost ? "Create" : "Update" }}</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 0.5em;
}

input, textarea, button, select {
  padding: 0.5em;
}

textarea {
  resize: vertical;
}

button, select {
  cursor: pointer;
}
</style>
