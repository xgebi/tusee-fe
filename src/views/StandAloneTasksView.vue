<template>
  <main class="page page-standalone-tasks">
    <MainNavigation></MainNavigation>
    This is Standalone tasks
  </main>
</template>

<script>
import MainNavigation from '@/components/shared/MainNavigation.vue';

export default {
  name: 'StandAloneTasksView',
  components: {
    MainNavigation,
  },
};
</script>

<style scoped></style>
