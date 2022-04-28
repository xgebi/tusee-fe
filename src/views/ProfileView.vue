<template>
  <main class="page page-dashboard">
    <MainNavigation></MainNavigation>
    <h1>Profile page</h1>
  </main>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import TaskService from '@/services/Task.service';
import TaskStatuses from '@/const/TaskStatuses';


</script>

<style scoped></style>
