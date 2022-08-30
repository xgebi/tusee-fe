<template>
  <main class="page page-single-note">
    <MainNavigation></MainNavigation>
    <form @submit="formSubmitted" class="note-view">
      <div>
        <router-link :to="{ name: 'notes' }">
          Back to notes
        </router-link>
      </div>
      <div class="note-view__input">
        <label for="title">Title</label>
        <input type="text" v-model="note.title" id="title" />
      </div>
      <div class="note-view__textarea">
        <label for="note">Note</label>
        <textarea v-model="note.note" id="note"></textarea>
      </div>

      <div class="note-view__info">
        Updated: {{ note.updated.toLocaleString() }}
      </div>
      <div class="note-view__info">
        Created: {{ note.created.toLocaleString() }}
      </div>
      <div class="note-view__button">
        <button>Save</button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import MainNavigation from '@/components/shared/MainNavigation.vue';
import { ref } from 'vue';
import { INote } from '@/interfaces/INote';
import NoteService from '@/services/Note.service';
import { useRoute } from 'vue-router';

const router = useRoute();

let note = ref<INote>({
  noteUuid: '',
  userUuid: '',
  title: '',
  note: '',
  updated: undefined,
  created: undefined,
});

const fetchNote = async () => {
  note.value = await NoteService.fetchNote(router.params.id as string);
}
fetchNote();

const formSubmitted = (e: Event) => {
  e.preventDefault();
  updateNote();
};

const updateNote = async () => {
  note.value = await NoteService.fetchNote(router.params.id as string);
};

</script>

<style scoped>
.page.page-single-note {
	grid-template-rows: 3rem;
}

.page-single-note .note-view {
	grid-column: 2 / 3;
}

.page-single-note .note-view div {
	display: flex;
	flex-flow: column;
}

.note-view__textarea textarea {
	height: 50vh;
}
</style>