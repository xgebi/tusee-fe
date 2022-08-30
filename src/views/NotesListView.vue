<template>
  <main class="page page-notes-list">
    <MainNavigation></MainNavigation>
    {{ list }}
  </main>
</template>

<script setup lang="ts">
import MainNavigation from '@/components/shared/MainNavigation.vue';
import NoteService from '@/services/Note.service';
import { ref } from 'vue';
import type { INote } from '@/interfaces/INote';

const list = ref<INote[]>([]);

const fetchNotesList = async () => {
  list.value = await NoteService.getNotes();
}
fetchNotesList();

</script>

<style scoped>

</style>