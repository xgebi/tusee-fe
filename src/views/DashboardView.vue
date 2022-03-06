<template>
  <main class="page page-dashboard">
    <MainNavigation></MainNavigation>
    This is Dashboard
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import MainNavigation from '@/components/MainNavigation.vue';

export default defineComponent({
  name: 'DashboardView',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  components: {
    MainNavigation,
  },
});
</script>

<style scoped>
</style>