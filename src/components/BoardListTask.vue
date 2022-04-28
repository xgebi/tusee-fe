<template>
  <div class="board-list-task">
    <p>
      <router-link
        :to="{ path: `/task/${props.task.task_uuid}` }"
        class="edit"
      >{{ props.task.title }}
      </router-link
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import type ITask from '@/interfaces/ITask';

const props = defineProps<{
  task: ITask;
}>();
</script>

<style scoped>
.board-list-task {
  background: antiquewhite;
  padding: .5rem;
}

.board-list-task p {
  margin: 0;
}

a,
a:visited {

}
</style>