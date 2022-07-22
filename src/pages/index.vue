<script setup lang="ts">
const url = "https://jsonplaceholder.typicode.com/users"
const { data: users } = await useFetch(url)
</script>

<template>
  <div>
    <div class="text-3xl">Hello World!</div>

    <ul class="text-3xl py-3">
      <li v-for="user of users" :key="user.id">
        <div>{{ user.username }}</div>
        <div>{{ user.name }}</div>
      </li>
    </ul>
  </div>
</template>
