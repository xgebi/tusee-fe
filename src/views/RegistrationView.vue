<template>
  <main class="page page-login">
    <section>
      <form
        v-on:submit="login"
        v-if="!registrationSuccessful || !registrationAttempted"
      >
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
        <button>Register</button>
      </form>
      <div v-if="registrationSuccessful && registrationAttempted">
        <RouterLink :to="{ name: 'login' }">Continue to login</RouterLink>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import UserService from '@/services/User.service';

type RegistrationViewState = {
  username: string;
  password: string;
  error: null | string;
  registrationSuccessful: boolean;
  registrationAttempted: boolean;
};

export default defineComponent({
  name: 'RegistrationView',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      username: '',
      password: '',
      error: null,
      registrationSuccessful: false,
      registrationAttempted: false,
    } as RegistrationViewState;
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async login(e: Event) {
      e.preventDefault();
      this.registrationAttempted = true;
      try {
        const registration = await UserService.register({
          username: this.username,
          password: this.password,
        });
        if (!registration.registrationSuccessful) {
          throw new Error(registration.error);
        }
        this.registrationSuccessful = registration.registrationSuccessful;
      } catch (e) {
        this.registrationSuccessful = false;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import '../assets/user-modals.scss';
</style>
