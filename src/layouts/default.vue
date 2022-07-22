<script setup>
import "../assets/styles/index.css"
import "../lib/register-service-worker"
</script>

<template>
  <div class="min-h-screen">
    <Head>
      <Meta name="description" content="🍅 A Pomodoro timer." />
      <Link rel="shortcut icon" href="/favicon.ico" />
    </Head>

    <slot />
  </div>
</template>
