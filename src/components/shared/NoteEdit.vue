<template>
  <section>
    <button @click="openDialog">Create new note</button>
    <dialog @close="createNewNote" ref="dialog">
      <form method="dialog" @submit="createNewNote">
        <div>
          <label for="note-title">Title</label>
          <input id="note-title" v-model="note.title" />
        </div>
        <div>
          <label for="note-note">Note</label>
          <textarea id="note-note" v-model="note.note"></textarea>
        </div>
        <button value="cancel">Cancel</button>
        <button id="confirmBtn" value="create">Create note</button>
      </form>
    </dialog>
  </section>
</template>

<script setup lang="ts">
import type { INote } from '@/interfaces/INote';
import { reactive, type Ref, ref } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import { useBoardsStore } from '@/stores/boards';
import NoteService from '@/services/Note.service';

const dialog = ref(null);

const taskStore = useTaskStore();
const boardsStore = useBoardsStore();
console.log('boards', boardsStore.getBoards);

const props = defineProps<{
  newNote?: boolean;
  note?: INote;
}>();

const emit = defineEmits<{
  (e: 'created', note: INote): void;
  (e: 'updated', note: INote): void;
}>();

let note: INote;
if (props.newNote && !props.note) {
  note = reactive({
    note: '',
    title: '',
  } as INote);
} else {
  note = reactive(props.note as INote);
}

const dialogOpened: Ref<boolean> = ref(false);
const openDialog = () => {
  dialog.value.showModal();
};

const createNewNote = async (e: Event) => {
  e.preventDefault();
  dialog.value.close();
  if (e.target?.returnValue === 'create' || e.target.tagName === 'FORM') {
    if (note.title.length === 0) {
      return;
    }

    await NoteService.createNote(note);

    note.note = '';
    note.title = '';
  }
};
</script>
<style scoped>
dialog::backdrop {
  background: rgba(101, 82, 82, 0.25);
}

form div {
  display: flex;
  flex-flow: column;
}
</style>
