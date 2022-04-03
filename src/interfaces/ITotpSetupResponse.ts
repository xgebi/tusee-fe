import type IKey from '@/interfaces/IKey';

interface ITotpSetupResponse {
  totpVerified: boolean;
  keys: IKey[];
}

export default ITotpSetupResponse;
