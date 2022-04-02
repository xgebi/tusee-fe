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
      },
    } as UserState),
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    async login(email: string, password: string) {
      const returned: any = await UserService.login({ email, password });
      const token: IUserToken = {
        automaticLogoutTime: dayjs(returned.expiry_date),
        displayName: returned.display_name,
        email: returned.email,
        firstLogin: returned.first_login,
        keys: returned.keys,
        password: this.token.password,
        token: returned.token,
        totpSecret: returned.totp_secret,
        userUuid: returned.user_uuid,
        usesTotp: returned.uses_totp,
      };
      console.log(token);
      this.token = token;
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
      };
    },
    async confirmTotp(code: string) {
      if (await UserService.confirmTotp(code, this.token.token)) {
        this.token.usesTotp = true;
        this.token.firstLogin = false;
      }
    },
  },
});
