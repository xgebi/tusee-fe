<template>
  <main class="page page-notes-list">
    <MainNavigation></MainNavigation>
    <h1>Notes</h1>
    <ul>
      <li v-for="note in list" :key="note.noteUuid">
        <router-link
          :to="{ path: `/note/${note.noteUuid}` }"
          >{{ note.title }}
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import MainNavigation from '@/components/shared/MainNavigation.vue';
import NoteService from '@/services/Note.service';
import { ref } from 'vue';
import type { INote } from '@/interfaces/INote';
import NoteEdit from '@/components/shared/NoteEdit.vue';

const list = ref<INote[]>([]);

const fetchNotesList = async () => {
  list.value = await NoteService.getNotes();
}
fetchNotesList();

</script>

<style scoped>

</style>