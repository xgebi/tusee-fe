import type dayjs from 'dayjs';
import type { IKey } from '@/interfaces/IKey';
import type { IBoard } from '@/interfaces/IBoard';

interface IUserToken {
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
  boards?: IBoard[];
}

export default IUserToken;
