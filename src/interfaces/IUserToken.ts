import type dayjs from 'dayjs';

interface IUserToken {
  username: string;
  password: string;
  keys: string[];
  firstLogin: boolean;
  mfaEnabled: boolean;
  automaticLogoutTime: dayjs.Dayjs;
  encryptedToken: string;
}

export default IUserToken;
