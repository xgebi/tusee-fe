<template>
  <main class="page page-single-board-settings">
    <MainNavigation></MainNavigation>
    <div>
      <label for="board-name">Board name</label>
      <input
        type="text"
        id="board-name"
        name="board-name"
        v-model="boardData.name"
      />
    </div>
    <div>
      <label for="board-description">Board description</label>
      <input
        type="text"
        id="board-description"
        name="board-description"
        v-model="boardData.description"
      />
    </div>
    <div>
      <h2>Columns</h2>
      <div
        draggable="true"
        v-for="(column, index) in columns"
        :key="column.name"
      >
        - {{ column.name }} : {{ column.type }}
        <button
          :data-value="column.name"
          @click="moveColumnUp"
          v-if="index > 0"
        >
          ⬆
        </button>
        <button
          :data-value="column.name"
          @click="moveColumnDown"
          v-if="index < columns.length - 1"
        >
          ⬇
        </button>
        <button :data-value="column.name" @click="deleteColumn">Delete</button>
      </div>
      <button @click="showNewColumnForm">Add column</button>
      <div v-if="newColumnFormVisible">
        <div>
          <label for="column-name">Column name</label>
          <input
            name="column-name"
            id="column-name"
            v-model="newColumnData.name"
          />
        </div>
        <div>
          <label for="column-type">Column type</label>
          <select v-model="newColumnData.type">
            <option
              v-for="entry in Object.entries(TaskStatuses)"
              v-bind:key="entry[0]"
              :value="entry[1]"
            >
              {{ entry[1] }}
            </option>
          </select>
        </div>
        <button @click="addColumn">Add column</button>
      </div>
      <button @click="saveBoard">Save board</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, Ref, ref } from 'vue';
import MainNavigation from '@/components/shared/MainNavigation.vue';
import BoardsService from '@/services/Boards.service';
import type IBoard from '@/interfaces/IBoard';
import { useRoute, useRouter } from 'vue-router';
import TaskStatuses from '@/const/TaskStatuses';
import type IColumn from '@/interfaces/IColumn';

const route = useRoute();
const router = useRouter();

/**
 * Initializing data for component
 */
const baseColumns = Object.entries(TaskStatuses)
  .map((entry) => {
    return `${entry[0]}:${entry[1]}`;
  })
  .join(',');

let boardData: IBoard = reactive({
  boardUuid: '',
  name: '',
  description: '',
  owner: '',
  created: undefined,
  columns: baseColumns,
});
if (route.params.id !== 'new') {
  reactive({
    ...BoardsService.getBoardInformation(route.params.id as string),
  });
}
/**
 * Code related to setting up columns
 */
let columns: IColumn[] = reactive([]);

function columnsSetup() {
  columns = [];
  for (const column of boardData.columns.split(',')) {
    const columnItems: string[] = column.split(':');
    columns.push({
      name: columnItems[1],
      type: TaskStatuses[columnItems[0]],
    });
  }
}

columnsSetup();

const deleteColumn = (e: Event) => {
  e.preventDefault();
  console.log(e.target, 'deleteColumn');
};
const moveColumnUp = (e: Event) => {
  const column = (e.target as HTMLElement).dataset.value;
  const i: number = columns.findIndex((c) => c.name === column);
  [columns[i - 1], columns[i]] = [columns[i], columns[i - 1]];
};

const moveColumnDown = (e: Event) => {
  const column = (e.target as HTMLElement).dataset.value;
  const i: number = columns.findIndex((c) => c.name === column);
  [columns[i], columns[i + 1]] = [columns[i + 1], columns[i]];
};
/**
 * Code related to creating new board
 */
let newColumnFormVisible: Ref<boolean> = ref(false);
const newColumnData = reactive({
  name: '',
  type: TaskStatuses.IN_PROGRESS,
});
const showNewColumnForm = () => {
  newColumnFormVisible.value = !newColumnFormVisible.value;
};
const addColumn = () => {
  const reversedColumns = columns.reverse();
  const i = reversedColumns.findIndex((c) => c.type === newColumnData.type);
  reversedColumns.splice(i, 0, {
    name: newColumnData.name,
    type: newColumnData.type,
  });
  columns = reversedColumns.reverse();
  newColumnData.name = '';
  newColumnData.type = TaskStatuses.IN_PROGRESS;
  showNewColumnForm();
};
/**
 * Code related to saving a board
 */
const saveBoard = async (e: Event) => {
  boardData.columns = columns
    .map((column) => `${column.name}:${column.type}`)
    .join(',');
  let result: IBoard;
  if (route.params.id !== 'new') {
    result = await BoardsService.createNewBoard(boardData);
    await router.push({
      name: 'board-settings',
      params: { id: result.boardUuid },
    });
  } else {
    result = await BoardsService.updateBoard(boardData);
  }
  boardData = result;
  columnsSetup();
};
</script>

<style scoped></style>
