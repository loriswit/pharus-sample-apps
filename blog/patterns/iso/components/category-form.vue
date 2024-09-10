<script setup>
defineProps({
  category: { type: Object, required: true },
  newCategory: { type: Boolean, default: false },
  error: { type: String, default: null },
})

const input = ref(null)
onMounted(() => input.value.select())
</script>

<template>
  <form>
    <p v-if="error" class="error">{{ error }}</p>
    <label>
      Category name
      <input type="text" v-model="category.name" ref="input" required minlength="1" autofocus>
    </label>
    <button type="submit">{{ newCategory ? "Create" : "Update" }}</button>
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
