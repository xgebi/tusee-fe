import type dayjs from 'dayjs';
import type IKey from '@/interfaces/IKey';

interface IUserToken {
  username: string;
  password: string;
  keys: IKey[];
  firstLogin: boolean;
  mfaEnabled: boolean;
  automaticLogoutTime: dayjs.Dayjs;
  encryptedToken: string;
}

export default IUserToken;
