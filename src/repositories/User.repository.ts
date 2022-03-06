import type ILoginInfo from '../interfaces/ILoginInfo';
import type IUserToken from '../interfaces/IUserToken';
import dayjs from 'dayjs'

class UserRepository {
  public static async login(info: ILoginInfo): Promise<IUserToken> {
    return new Promise((resolve, reject) => {
      resolve({
        username: info.username,
        keys: [],
        automaticLogoutTime: dayjs().add(30, 'minutes'),
        firstLogin: true,
        mfaEnabled: true,
      } as IUserToken);
    });
  }
}

export default UserRepository;
