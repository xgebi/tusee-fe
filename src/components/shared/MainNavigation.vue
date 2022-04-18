<template>
  <section class="top-bar">
    <p>Tusee</p>
    <TaskEdit :new-task="true"></TaskEdit>
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

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import TaskEdit from '@/components/shared/TaskEdit.vue';

const router = useRouter();

const userStore = useUserStore();

const logOut = (e: Event) => {
  e.preventDefault();
  userStore.logout();
  router.push({ name: 'loggedOut' });
};
</script>

<style scoped>
.top-bar {
  grid-column: 1 / 4;
}
</style>
