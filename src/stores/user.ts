import { defineStore } from 'pinia';
import UserService from '@/services/User.service';
import type { IUserToken } from '@/interfaces/IUserToken';
import dayjs from 'dayjs';
import type ITotpSetupResponse from '@/interfaces/ITotpSetupResponse';
import type { IKey } from '@/interfaces/IKey';

export type UserState = {
  token: IUserToken;
  error: boolean;
};

export const useUserStore = defineStore({
  id: 'user',
  state: () =>
    ({
      token: {
        email: '',
        password: '',
        keys: [],
        firstLogin: false,
        usesTotp: false,
        automaticLogoutTime: dayjs().add(30, 'minute'), // temporary value
        token: '', // temporary value
        displayName: '',
        totpSecret: '',
        userUuid: '',
        boards: [],
      },
      error: false,
    } as UserState),
  getters: {
    getToken: (state): IUserToken => state.token,
    getJwtToken: (state): string => state.token.token,
    getAuthenticated: (state): boolean =>
      state.token.automaticLogoutTime.isAfter(dayjs()) &&
      state.token.token.length > 0,
    getLoginError: (state): boolean => {
      console.log(state.error);
      return state.error;
    },
  },
  actions: {
    async login(email: string, password: string) {
      // TODO harmonize JSON
      try {
        this.token = await UserService.login({ email, password });
        this.error = false;
        localStorage.setItem('token', this.token.token);
      } catch (e) {
        this.error = true;
      }
    },
    logout() {
      this.token = {
        email: '',
        password: '',
        keys: [],
        firstLogin: false,
        usesTotp: false,
        automaticLogoutTime: dayjs(),
        token: '',
        displayName: '',
        totpSecret: '',
        userUuid: '',
        boards: [],
      };
    },
    updateToken(token: string) {
      this.token.token = token;
      this.token.automaticLogoutTime = dayjs().add(30, 'minute');
    },
    addKey(key: IKey) {
      this.token.keys.push(key);
    },
    removeKey(board: string) {
      const i = this.token.keys.findIndex((lk) => lk.board === board);
      this.token.keys.splice(i, 1);
    },
    async confirmTotp(code: string) {
      const result = await UserService.confirmTotp(code);
      if (result.length > 0) {
        this.token.usesTotp = true;
        this.token.firstLogin = false;
        this.token.keys = result;
      }
    },
    async setupTotp(code: string) {
      const result: ITotpSetupResponse = await UserService.setupTotp(code);
      if (result.totpVerified) {
        this.token.usesTotp = true;
        this.token.firstLogin = false;
      }
    },
    async skipTotp() {
      const result = await UserService.skipTotp();
      if (result.keys.length > 0) {
        this.token.usesTotp = false;
        this.token.firstLogin = false;
        this.token.keys = result.keys;
      }
    },
  },
});
