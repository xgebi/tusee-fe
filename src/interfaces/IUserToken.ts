import type dayjs from 'dayjs';

interface IUserToken {
  username: string;
  keys: string[];
  firstLogin: boolean;
  mfaEnabled: boolean;
  automaticLogoutTime: dayjs.Dayjs;
}

export default IUserToken;
