<template>
  <main class="page page-login">
    <section v-if="settingsStore.getRegistrationEnabled">
      <form
        v-on:submit="register"
        v-if="!state.registrationSuccessful || !state.registrationAttempted"
      >
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="state.username" />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="state.password" />
        <label for="display-name">Display Name:</label>
        <input type="text" id="display-name" v-model="state.displayName" />
        <button class="button">Register</button>
      </form>
      <div v-if="state.registrationSuccessful && state.registrationAttempted">
        <RouterLink :to="{ name: 'login' }">Continue to login</RouterLink>
      </div>
    </section>
    <section v-else>Registration disabled</section>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import UserService from '@/services/User.service';
import { useSettingsStore } from '@/stores/settings';
import { useRouter } from 'vue-router';

type RegistrationViewState = {
  username: string;
  password: string;
  displayName: string;
  error: null | string;
  registrationSuccessful: boolean;
  registrationAttempted: boolean;
};
const state: RegistrationViewState = reactive({
  username: '',
  password: '',
  displayName: '',
  error: null,
  registrationSuccessful: false,
  registrationAttempted: false,
});

const router = useRouter();
const settingsStore = useSettingsStore();
const fetchSettings = async () => {
  await settingsStore.fetchSettings();
  console.log(settingsStore.getRegistrationEnabled)
};
fetchSettings();

const register = async (e: Event) => {
  e.preventDefault();
  state.registrationAttempted = true;
  try {
    const registration = await UserService.register({
      email: state.username,
      password: state.password,
      displayName: state.displayName,
      key: '',
    });
    if (!registration.registrationSuccessful) {
      throw new Error(registration.error);
    }
    state.registrationSuccessful = registration.registrationSuccessful;
  } catch (e) {
    console.log(e);
    state.registrationSuccessful = false;
  }
};
</script>

<style scoped lang="scss">
@import '../assets/user-modals.scss';
</style>
