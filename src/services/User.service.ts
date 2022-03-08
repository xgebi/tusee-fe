import type ILoginInfo from '@/interfaces/ILoginInfo';
import UserRepository from '@/repositories/User.repository';
import type IUserToken from '@/interfaces/IUserToken';

class UserService {
  public static async login(info: ILoginInfo): Promise<IUserToken> {
    return UserRepository.login(info);
  }

  public static async confirmTotp(
    token: string,
    totpCode: string
  ): Promise<boolean> {
    return await UserRepository.confirmTotp(token, totpCode);
  }
}

export default UserService;
