<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import MarkdownIt from "markdown-it"
import { http } from "@/http.js"

const route = useRoute()
const router = useRouter()

const post = ref(await http.get("/posts/" + route.params.id))

const md = new MarkdownIt({ linkify: true })

function formatDate1(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-UK",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" })
}

function formatDate2(dateStr) {
  return new Date(dateStr).toLocaleString("en-GB",
      { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit" })
}

async function deletePost() {
  if (confirm("Are you sure you want to delete this post? (No undo)")) {
    await http.delete("/posts/" + route.params.id)
    router.push({ name: "posts" })
  }
}

const comment = { author: null, content: null }
const error = ref(null)

async function createComment() {
  await http.post(`/posts/${route.params.id}/comments`, comment)
  post.value.comments.push({ ...comment, created: new Date() })
  comment.author = null
  comment.content = null
}
</script>

<template>
  <div class="container">
    <header class="post-header">
      <h1>{{ post.title }}</h1>

      <router-link class="button" :to="{name: 'category', params:{id: post.categoryid }}">
        #{{ post.category }}
      </router-link>
      <p class="author">by <span class="name">{{ post.author }}</span></p>
      <p class="date">
        {{ formatDate1(post.created) }}
        <span v-if="post.created !== post.modified">(last modified {{ formatDate2(post.modified) }})</span>
      </p>
      <div class="actions">
        <router-link class="button" :to="{name: 'edit-post', params: {id: $route.params.id}}">Edit post</router-link>
        <button @click="deletePost">Delete post</button>
      </div>
    </header>

    <div class="content" v-html="md.render(post.content)"></div>

    <footer class="post-footer">
      <template v-if="post.comments.length > 0">
        <h2>Comments</h2>
        <div class="comments">
          <div v-for="comment in post.comments" class="comment">
            <header>
              <div class="author">{{ comment.author }}</div>
              <div class="date">{{ formatDate1(comment.created) }}</div>
            </header>
            <div class="message">{{ comment.content }}</div>
          </div>
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
    </footer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.container > * {
  width: 100%;
}

.post-header, .post-footer {
  background: aliceblue;
  overflow: auto;
  border-bottom: 1px cornflowerblue solid;
  border-top: 1px cornflowerblue solid;
  margin: 0 -1.5em;
  padding: 0 1.5em;
}

.post-header .actions {
  text-align: right;
  margin-bottom: 1em;
}

.content {
  flex-grow: 1;
  font-family: serif;
  max-width: 800px;
  margin: 2em auto 3em;
}

.content:deep(p) {
  text-align: justify;
}

.content:deep(img) {
  max-width: min(600px, 100%);
  max-height: 600px;
  margin: auto;
  display: block;
}

.post-footer :is(p, h2, h3) {
  text-align: center;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: min(600px, 100%);
  margin: auto;
}

.comment {
  padding: 1em;
  border-radius: 1em;
  background: white;
  border: 1px solid lightgrey;
}

.comment header {
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
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
