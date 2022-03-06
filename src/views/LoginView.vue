<template>
  <main class="page page-login">
    <section>
      <form v-on:submit="login">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
        <button>Log in</button>
      </form>
    </section>
  </main>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

type LoginViewState = {
  username: string;
  password: string;
  error: null | string;
};

export default defineComponent({
  name: 'LoginView',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      username: '',
      password: '',
      error: null,
    } as LoginViewState;
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async login(e: any) {
      e.preventDefault();
      await this.userStore.login(this.username, this.password);
      if (this.userStore.token) {
        await this.$router.push({ name: 'dashboard' });
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import '../assets/user-modals.scss';
</style>