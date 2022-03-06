import { defineStore } from 'pinia';
import UserService from '@/services/User.service';
import type IUserToken from '@/interfaces/IUserToken';

export type UserState = {
  token: IUserToken | null;
}

export const useUserStore = defineStore({
  id: 'user',
  state: () =>
    ({
      token: null,
    } as UserState),
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    async login(username: string, password: string) {
      const token = await UserService.login({username, password});
      this.token = token;
    },
    logout() {
      this.token = null;
    }
  },
});