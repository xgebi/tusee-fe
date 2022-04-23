import { defineStore } from 'pinia';
import type IBoard from '@/interfaces/IBoard';
import BoardsService from '@/services/Boards.service';

export type BoardsState = {
  boards: IBoard[];
  selectedBoard?: IBoard;
};

export const useBoardsStore = defineStore({
  id: 'boards',
  state: () =>
    ({
      boards: [],
      selectedBoard: undefined,
    } as BoardsState),
  getters: {
    getBoards: (state) => state.boards,
    getSelectedBoard: (state) => state.selectedBoard,
  },
  actions: {
    selectBoard(boardUUid: string) {
      this.selectedBoard = this.boards.find(
        (board) => board.boardUuid === boardUUid
      );
    },
    async fetchBoards() {
      this.boards = await BoardsService.getAvailableBoards();
    },
    setBoards(boards: IBoard[]) {
      this.boards = boards;
    },
  },
});
