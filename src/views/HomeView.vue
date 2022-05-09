<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue';
</script>

<template>
  <main>
    <RouterLink :to="{ name: 'login' }">Continue to login</RouterLink>
  </main>
</template>
