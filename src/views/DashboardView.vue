<template>
  <main class="page page-dashboard">
    <MainNavigation></MainNavigation>
		<div>This is Dashboard</div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import MainNavigation from '@/components/shared/MainNavigation.vue';

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

<style scoped lang="scss">
.page-dashboard > *:not(.top-bar) {
  grid-column: 2 / 3;

	@media only screen and (max-width: 48rem) {
    grid-column: 1 / 2;
  }
}
</style>
