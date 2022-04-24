import { defineStore } from 'pinia';
import type IBoard from '@/interfaces/IBoard';
import BoardsService from '@/services/Boards.service';
import type ITask from '@/interfaces/ITask';
import TaskService from '@/services/Task.service';

export type BoardsState = {
  boards: IBoard[];
  selectedBoard?: IBoard;
  selectedBoardTasks: ITask[];
};

export const useBoardsStore = defineStore({
  id: 'boards',
  state: () =>
    ({
      boards: [],
      selectedBoard: undefined,
      selectedBoardTasks: [],
    } as BoardsState),
  getters: {
    getBoards: (state) => state.boards,
    getSelectedBoard: (state) => state.selectedBoard,
    getSelectedBoardTasks: (state) => state.selectedBoardTasks,
  },
  actions: {
    selectBoard(boardUUid: string) {
      this.selectedBoard = this.boards.find(
        (board) => board.boardUuid === boardUUid
      );
    },
    async setSelectedBoard(board: string) {
      const resp = await BoardsService.getBoardView(board);
      this.selectedBoard = resp.board;
      this.selectedBoardTasks = resp.tasks;
    },
    async fetchBoards() {
      this.boards = await BoardsService.getAvailableBoards();
    },
    setBoards(boards: IBoard[]) {
      this.boards = boards;
    },
    async updateBoardTask(taskId: string, column: string) {
      const i = this.getSelectedBoardTasks.findIndex(
        (bt) => bt.task_uuid === taskId
      );
      const tempTask = this.getSelectedBoardTasks[i];
      if (tempTask) {
        const replacementTask = {
          ...tempTask,
          task_status: column,
        };
        this.selectedBoardTasks.splice(i, 1, replacementTask);
        await TaskService.updateTask(replacementTask);
      }
    },
  },
});
