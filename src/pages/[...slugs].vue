<template>
  <div class="flex flex-col space-y-2">
    <div class="text-3xl font-semibold">404</div>
    <div class="text-xl">Page Not Found</div>
    <div class="text-lg">Path: /{{ $route.params.slugs.join("/") }}</div>
  </div>
</template>
