<template>
  <main class="page page-login">
    <section>
      <section v-if="userStore.getLoginError">
        Error occurred during logging in
      </section>
      <section>
        <form v-on:submit="login">
					<div>
						<label for="username">Username:</label>
						<input type="text" id="username" v-model="state.username" />
					</div>
					<div>
						<label for="password">Password:</label>
						<input type="password" id="password" v-model="state.password" />
					</div>
          <button class="button">Log in</button>
        </form>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingsStore } from '@/stores/settings';

type LoginViewState = {
  username: string;
  password: string;
};
const state: LoginViewState = reactive({
  username: '',
  password: '',
});

const router = useRouter();
const settingsStore = useSettingsStore();
// await settingsStore.fetchSettings();
console.log('What?');
const userStore = useUserStore();

const login = async (e: Event) => {
  e.preventDefault();
  await userStore.login(state.username, state.password);
  if (userStore.getToken.firstLogin) {
    router.push({ name: 'totp-setup' });
  } else if (!userStore.getToken.usesTotp) {
    router.push({ name: 'dashboard' });
  } else if (userStore.getToken.usesTotp) {
    router.push({ name: 'totp' });
  }
};
</script>

<style scoped lang="scss">
@import '../assets/user-modals.scss';
</style>
