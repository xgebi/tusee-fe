<template>
  <main class="page page-profile">
    <MainNavigation></MainNavigation>
    <section>
      <h1>Profile page</h1>
			<form>
				<div class="profile__input">
					<label for="title">Name</label>
					<input type="text" :value="userStore.token.displayName" id="title" />
				</div>
				<div class="profile__input">
					<label for="title">Time zone</label>
					<Typeahead :items="timezones"  selected=""/>
				</div>
				<button class="button">Save</button>
			</form>
      <div>
      </div>
			<hr />
      <div>
        <button class="button" @click="downloadData">Download decrypted data</button>
      </div>
			<hr />
      <div>
        <section>
          <label for="import-file">Import file</label>
          <input id="import-file" type="file" @change="fileToImportChanged" />
        </section>

        <section>
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" />
        </section>

        <button class="button" @click="importFile">Upload data</button>
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
import type { ITask } from '@/interfaces/ITask';
import KeyService from '@/services/Key.service';
import Typeahead from '@/components/shared/Typeahead.vue';

const userStore = useUserStore();
const fileToImport = ref<IExportImport>({
  keys: [],
  boards: [],
  standAloneTasks: [],
});

const password = ref<string>('');
const timezones = (Intl.supportedValuesOf('timeZone') as string[]);

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

const importFile = async () => {
  userStore.importKeys(fileToImport.value.keys);
  // standalone tasks
  await TaskService.importMultipleTasks(fileToImport.value.standAloneTasks);
  // boards
  await BoardsService.importMultipleBoards(fileToImport.value.boards);
  // board tasks
  for (const board of fileToImport.value.boards) {
    await TaskService.importMultipleTasks(board.tasks as ITask[]);
  }
  // keys
  await KeyService.importMultipleKeys(fileToImport.value.keys, password.value);
};
</script>

<style scoped></style>
