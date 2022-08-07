import { defineStore } from 'pinia';
import type { IBoard } from '@/interfaces/IBoard';
import BoardsService from '@/services/Boards.service';
import type { ITask } from '@/interfaces/ITask';
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
    getSelectedBoardTasks: (state) => {
      console.log(state.selectedBoardTasks);
      return state.selectedBoardTasks;
    },
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
    async createBoard(board: IBoard) {
      const result = await BoardsService.createNewBoard(board);
      this.boards.push(result);
      return result;
    },
    async updateBoard(board: IBoard) {
      const result = await BoardsService.updateBoard(board);
      const i = this.boards.findIndex((b) => b.boardUuid === result.boardUuid);
      this.boards.splice(i, 1, result);
      return result;
    },
    async updateBoardTask(taskId: string, column: string) {
      const i = this.getSelectedBoardTasks.findIndex(
        (bt) => bt.taskUuid === taskId
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
    async appendTaskToSelectedBoard(task: ITask) {
      this.selectedBoardTasks.push(await TaskService.createTask(task));
    },
  },
});
