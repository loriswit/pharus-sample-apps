<script setup>
import { RouterView } from "vue-router"
</script>

<template>
  <header class="site-header">
    <div class="title">My Blog</div>
    <nav>
      <router-link :to="{ name: 'posts'}">All posts</router-link>
      <router-link :to="{ name: 'categories'}">Categories</router-link>
    </nav>
  </header>
  <main>
    <Suspense>
      <RouterView/>
    </Suspense>
  </main>
</template>
