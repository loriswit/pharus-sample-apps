<script setup>
import { computed, ref } from "vue"
import { http } from "@/utils/http.js"
import Comment from "@/components/Comment.vue"

const { commentsCount, postId } = defineProps({
  commentsCount: { type: Number, required: true },
  postId: { type: Number, required: true },
})

const newComments = ref([])
const hasComments = computed(() => commentsCount + newComments.value.length > 0)

const comment = ref({ author: null, content: null })
const error = ref(null)

async function createComment() {
  await http.post(`/posts/${postId}/comments`, comment.value)
  newComments.value.push({ ...comment.value, created: new Date() })
  comment.value.author = null
  comment.value.content = null
}
</script>

<template>
  <template v-if="hasComments">
    <h2>Comments</h2>
    <div class="comments">
      <slot/>
      <Comment v-for="comment in newComments" :comment="comment"></Comment>
    </div>
  </template>
  <p v-else>No comments yet</p>

  <form @submit.prevent="createComment">
    <h3>Leave a comment</h3>

    <p v-if="error" class="error">{{ error }}</p>

    <label for="name">Your name</label>
    <input id="name" minlength="1" required v-model="comment.author">
    <label for="message">Message</label>
    <textarea id="message" rows="4" minlength="1" v-model="comment.content"></textarea>
    <div class="actions">
      <button type="submit">Send</button>
    </div>
  </form>
</template>

<style scoped>
p, h2, h3 {
  text-align: center;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: min(600px, 100%);
  margin: auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: min(600px, 100%);
  margin: 0 auto 2em;
}

form label {
  font-weight: bold;
}

form textarea {
  resize: vertical;
}

form .actions {
  text-align: right;
}

form input, form textarea {
  padding: 0.5em;
}
</style>
