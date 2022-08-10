<template>
  <main class="page page-dashboard">
    <MainNavigation></MainNavigation>
    <section>
      <h1>Profile page</h1>
      <div>
        Name: {{ userStore.token.displayName }}
      </div>
      <div>
        <button @click="downloadData">Download decrypted data</button>
      </div>
      <div>
        <input type="file" @change="fileToImportChanged" />
        <button @click="importFile">Upload data</button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import MainNavigation from '@/components/shared/MainNavigation.vue';
import { useUserStore } from '@/stores/user';
import TaskService from '@/services/Task.service';
import BoardsService from '@/services/Boards.service';
import { ref } from 'vue';
import type { IExportImport } from '@/interfaces/IExportImport';

const userStore = useUserStore();
const fileToImport = ref<IExportImport>({
  keys: [],
  boards: [],
  standAloneTasks: [],
});

const downloadData = async () => {
  // Get standalone tasks
  const standAloneTasks = await TaskService.getStandAloneTasks();
  // Get boards
  const boards = await BoardsService.getAvailableBoards();
  for (const board of boards) {
    board.tasks = (await BoardsService.getBoardView(board.boardUuid)).tasks;
  }
  const data = JSON.stringify({
    keys: userStore.token.keys,
    standAloneTasks,
    boards,
  });

  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8, ' + encodeURIComponent(data)
  );
  element.setAttribute('download', 'tusee-data.json');
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const fileToImportChanged = (e: Event) => {
  const reader = new FileReader();
  reader.onload = function (evt) {
    fileToImport.value = JSON.parse(evt.target.result) as IExportImport;
  };
  reader.readAsBinaryString(e.target.files[0]);
};

const importFile = () => {
  console.log(fileToImport.value);
};
</script>

<style scoped></style>
