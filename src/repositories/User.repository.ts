import type ILoginInfo from '../interfaces/ILoginInfo';
import type { IUserToken, IReceivedUserToken } from '@/interfaces/IUserToken';
import type IRegistrationInfo from '@/interfaces/IRegistrationInfo';
import type IRegistrationResult from '@/interfaces/IRegistrationResult';
import Fetch from '@/utils/Fetch';
import type ITotpSetup from '@/interfaces/ITotpSetup';
import type ITotpConfirmation from '@/interfaces/ITotpConfirmation';
import type ITotpSetupResponse from '@/interfaces/ITotpSetupResponse';
import type ITotpConfirmationResponse from '@/interfaces/ITotpConfirmationResponse';

class UserRepository {
  public static async login(info: ILoginInfo): Promise<IReceivedUserToken> {
    const response = await Fetch.post('login', info, true, true);
    if (response.ok) {
      const result = await response.json();
      return result as IReceivedUserToken;
    }
    throw new Error();
  }

  public static async register(
    info: IRegistrationInfo
  ): Promise<IRegistrationResult> {
    const response = await Fetch.post('register', info, true, true);
    if (response.ok) {
      const result = await response.json();
      return result as IRegistrationResult;
    }
    throw new Error();
  }

  public static async confirmTotp(
    totpCode: ITotpConfirmation
  ): Promise<ITotpConfirmationResponse> {
    const response = await Fetch.post('totp/verify', totpCode, true, true);
    if (response.ok) {
      const result = await response.json();
      return result as ITotpConfirmationResponse;
    }
    throw new Error();
  }

  public static async setupTotp(body: ITotpSetup): Promise<ITotpSetupResponse> {
    const response = await Fetch.post('totp/setup', body, true, true);
    if (response.ok) {
      const result = await response.json();
      return result as ITotpSetupResponse;
    }
    throw new Error();
  }

  public static async authenticateFromToken(token: string): Promise<IUserToken> {
    const response = await Fetch.get('token/authorize', true);
    if (response.ok) {
      const result = await response.json();
      console.log('repo', result);
      return result.user as IUserToken;
    }
    throw new Error();
  }
}

export default UserRepository;
