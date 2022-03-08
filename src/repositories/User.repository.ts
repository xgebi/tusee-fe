import type ILoginInfo from '../interfaces/ILoginInfo';
import type IUserToken from '../interfaces/IUserToken';
import dayjs from 'dayjs';

class UserRepository {
  public static async login(info: ILoginInfo): Promise<IUserToken> {
    return new Promise((resolve, reject) => {
      resolve({
        username: info.username,
        password: info.password,
        keys: [],
        automaticLogoutTime: dayjs().add(30, 'minutes'),
        firstLogin: true,
        mfaEnabled: true,
        encryptedToken: 'abc',
      } as IUserToken);
    });
  }

  public static async confirmTotp(
    token: string,
    totpCode: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}

export default UserRepository;
