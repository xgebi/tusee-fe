import type ILoginInfo from '../interfaces/ILoginInfo';
import type IUserToken from '../interfaces/IUserToken';
import type IRegistrationInfo from '@/interfaces/IRegistrationInfo';
import type IRegistrationResult from '@/interfaces/IRegistrationResult';
import Fetch from '@/utils/Fetch';
import type ITotpSetup from '@/interfaces/ITotpSetup';
import type IKey from '@/interfaces/IKey';
import type ITotpConfirmation from '@/interfaces/ITotpConfirmation';
import type ITotpSetupResponse from '@/interfaces/ITotpSetupResponse';

class UserRepository {
  public static async login(info: ILoginInfo): Promise<IUserToken> {
    const response = await Fetch.post('login', info);
    if (response.ok) {
      const result = await response.json();
      return result as IUserToken;
    }
    throw new Error();
  }

  public static async register(
    info: IRegistrationInfo
  ): Promise<IRegistrationResult> {
    const response = await Fetch.post('register', info);
    if (response.ok) {
      const result = await response.json();
      return result as IRegistrationResult;
    }
    throw new Error();
  }

  public static async confirmTotp(
    totpCode: ITotpConfirmation
  ): Promise<IKey[]> {
    const response = await Fetch.post('verify-totp', totpCode);
    if (response.ok) {
      const result = await response.json();
      return result as IKey[];
    }
    throw new Error();
  }

  public static async setupTotp(body: ITotpSetup): Promise<ITotpSetupResponse> {
    const response = await Fetch.post('setup-totp', body);
    if (response.ok) {
      const result = await response.json();
      return result as ITotpSetupResponse;
    }
    throw new Error();
  }

  public static async authorizeFromToken(token: string): Promise<IUserToken> {
    const response = await Fetch.post('authorize-token', { token });
    if (response.ok) {
      const result = await response.json();
      return result as IUserToken;
    }
    throw new Error();
  }
}

export default UserRepository;
