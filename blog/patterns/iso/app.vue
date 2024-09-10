<template>
  <header class="site-header">
    <div class="title">My Blog</div>
    <nav>
      <NuxtLink to="/posts">All posts</NuxtLink>
      <NuxtLink to="/categories">Categories</NuxtLink>
    </nav>
  </header>
  <main>
    <NuxtPage/>
  </main>
</template>
