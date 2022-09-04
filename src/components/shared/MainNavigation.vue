<template>
  <section class="top-bar">
    <p class="top-bar__logo">Tusee</p>
    <nav class="top-bar__main-navigation">
      <ul class="top-bar__main-navigation__list">
        <li>
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'tasks' }">Standalone Tasks</router-link>
        </li>
        <li><router-link :to="{ name: 'events' }">Events</router-link></li>
        <li><router-link :to="{ name: 'boards' }">Boards</router-link></li>
        <li><router-link :to="{ name: 'notes' }">Notes</router-link></li>
        <li><router-link :to="{ name: 'calendar' }">Calendar</router-link></li>
        <li><router-link :to="{ name: 'profile' }">Profile</router-link></li>
        <li><button @click="logOut">Log out</button></li>
      </ul>
    </nav>
		<div class="top-bar__actions">
			<TaskEdit :new-task="true"></TaskEdit>
			<NoteEdit :new-note="true"></NoteEdit>
			<EventEdit :new-event="true"></EventEdit>
			<!--GoalEdit :new-goal="true"></GoalEdit-->
		</div>
  </section>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import TaskEdit from '@/components/shared/TaskEdit.vue';
import NoteEdit from '@/components/shared/NoteEdit.vue';
import EventEdit from '@/components/shared/EventEdit.vue';
import GoalEdit from '@/components/shared/GoalEdit.vue';

const router = useRouter();

const userStore = useUserStore();

const logOut = (e: Event) => {
  e.preventDefault();
  userStore.logout();
  router.push({ name: 'loggedOut' });
};
</script>