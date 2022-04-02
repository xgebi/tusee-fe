<template>
  <main class="page page-login">
    <section>
      <form
        v-on:submit="register"
        v-if="!registrationSuccessful || !registrationAttempted"
      >
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
        <label for="display-name">Display Name:</label>
        <input type="text" id="display-name" v-model="displayName" />
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
  displayName: string;
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
      displayName: '',
      error: null,
      registrationSuccessful: false,
      registrationAttempted: false,
    } as RegistrationViewState;
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async register(e: Event) {
      e.preventDefault();
      this.registrationAttempted = true;
      try {
        const registration = await UserService.register({
          email: this.username,
          password: this.password,
          displayName: this.displayName,
          key: '',
        });
        if (!registration.registrationSuccessful) {
          throw new Error(registration.error);
        }
        this.registrationSuccessful = registration.registrationSuccessful;
      } catch (e) {
        console.log(e);
        this.registrationSuccessful = false;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import '../assets/user-modals.scss';
</style>
