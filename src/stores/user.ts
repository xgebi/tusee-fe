import { defineStore } from 'pinia';
import UserService from '@/services/User.service';
import type IUserToken from '@/interfaces/IUserToken';
import dayjs from 'dayjs';

export type UserState = {
  token: IUserToken;
};

export const useUserStore = defineStore({
  id: 'user',
  state: () =>
    ({
      token: {
        username: '',
        password: '',
        keys: [],
        firstLogin: false,
        mfaEnabled: false,
        automaticLogoutTime: dayjs(),
        encryptedToken: '',
      },
    } as UserState),
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    async login(username: string, password: string) {
      // TODO get token, keep a copy of token in
      this.token = await UserService.login({ username, password });
    },
    logout() {
      this.token = {
        username: '',
        password: '',
        keys: [],
        firstLogin: false,
        mfaEnabled: false,
        automaticLogoutTime: dayjs(),
        encryptedToken: '',
      };
    },
    async confirmTotp(code: string) {
      if (await UserService.confirmTotp(code, this.token.encryptedToken)) {
        this.token.mfaEnabled = true;
        this.token.firstLogin = false;
      }
    },
  },
});
