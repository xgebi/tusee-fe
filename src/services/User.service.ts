import { v4 as uuidv4 } from 'uuid';
import AES from 'crypto-js/aes';

import type ILoginInfo from '@/interfaces/ILoginInfo';
import UserRepository from '@/repositories/User.repository';
import type IUserToken from '@/interfaces/IUserToken';
import type IRegistrationInfo from '@/interfaces/IRegistrationInfo';
import type IRegistrationResult from '@/interfaces/IRegistrationResult';
import type IKey from '@/interfaces/IKey';
import type ITotpSetupResponse from '@/interfaces/ITotpSetupResponse';
import { useUserStore } from '@/stores/user';

class UserService {
  public static async login(info: ILoginInfo): Promise<IUserToken> {
    const result_login = await UserRepository.login(info);
    const user = useUserStore();
    for (const key of result_login.keys) {
      key.key = AES.decrypt(key.key, user.token.password).toString();
    }
    return result_login;
  }

  public static async register(
    info: IRegistrationInfo
  ): Promise<IRegistrationResult> {
    info.key = AES.encrypt(uuidv4().toString(), info.password).toString();
    info.displayName = AES.encrypt(info.displayName, info.key).toString();
    return await UserRepository.register(info);
  }

  public static async confirmTotp(totpCode: string): Promise<IKey[]> {
    return await UserRepository.confirmTotp({
      totpCode,
    });
  }

  public static async setupTotp(totpCode: string): Promise<ITotpSetupResponse> {
    return await UserRepository.setupTotp({
      skip: false,
      totpCode: totpCode,
    });
  }

  public static async skipTotp(): Promise<ITotpSetupResponse> {
    return await UserRepository.setupTotp({
      skip: true,
      totpCode: '',
    });
  }

  public static async authorizeFromToken(token: string): Promise<IUserToken> {
    return await UserRepository.authorizeFromToken(token);
  }
}

export default UserService;
