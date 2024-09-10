<script setup>
const { comment } = defineProps({
  comment: { type: Object, required: true },
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-UK",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" })
}
</script>

<template>
  <div class="comment">
    <header>
      <div class="author">{{ comment.author }}</div>
      <div class="date">{{ formatDate(comment.created) }}</div>
    </header>
    <div class="message">{{ comment.content }}</div>
  </div>
</template>

<style scoped>
.comment {
  padding: 1em;
  border-radius: 1em;
  background: white;
  border: 1px solid lightgrey;
}

.comment > header {
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}
</style>
