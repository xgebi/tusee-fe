import type IKey from '@/interfaces/IKey';

interface ITotpSetupResponse {
  totpVerified: boolean;
  keys: IKey[];
  token: string;
}

export default ITotpSetupResponse;
