<template>
  <section class="top-bar">
    <p>Tusee</p>
    <button>New task</button>
    <button>New event</button>
    <nav class="main-navigation">
      <ul>
        <li>
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'tasks' }">Standalone Tasks</router-link>
        </li>
        <li><router-link :to="{ name: 'events' }">Events</router-link></li>
        <li><router-link :to="{ name: 'boards' }">Boards</router-link></li>
        <li><router-link :to="{ name: 'calendar' }">Calendar</router-link></li>
        <li><router-link :to="{ name: 'profile' }">Profile</router-link></li>
        <li><button @click="logOut">Log out</button></li>
      </ul>
    </nav>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'MainNavigation',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    logOut(e: Event) {
      e.preventDefault();
      this.userStore.logout();
      this.$router.push({ name: 'loggedOut' });
    },
  },
});
</script>
