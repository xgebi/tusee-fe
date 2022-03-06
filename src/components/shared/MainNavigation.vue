<template>
  <nav>This is navigation</nav>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'MainNavigation',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
});
</script>

<style scoped></style>
