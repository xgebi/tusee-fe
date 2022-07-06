import type dayjs from 'dayjs';
import type { IKey, IReceivedKey } from '@/interfaces/IKey';
import type IBoard from '@/interfaces/IBoard';

export interface IUserToken {
  email: string;
  password: string;
  keys: IKey[];
  firstLogin: boolean;
  usesTotp: boolean;
  automaticLogoutTime: dayjs.Dayjs;
  token: string;
  displayName: string;
  totpSecret: string;
  userUuid: string;
  boards: IBoard[];
}

export interface IReceivedUserToken {
  email: string;
  password: string;
  keys: IReceivedKey[];
  first_login: boolean;
  uses_totp: boolean;
  automatic_logout_time: dayjs.Dayjs;
  token: string;
  display_name: string;
  totp_secret: string;
  user_uuid: string;
  boards: IBoard[];
}
