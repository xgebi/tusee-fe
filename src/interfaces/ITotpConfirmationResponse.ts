import type { IKey } from '@/interfaces/IKey';

interface ITotpConfirmationResponse {
  keys: IKey[];
  token: string;
}

export default ITotpConfirmationResponse;
