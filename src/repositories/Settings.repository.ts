import type ISettings from '@/interfaces/ISettings';
import Fetch from '@/utils/Fetch';
import { useUserStore } from '@/stores/user';

class SettingsRepository {
  public static async getSettings(): Promise<ISettings> {
    const response = await Fetch.get('app-settings');
    if (response.ok) {
      const result = await response.json();
      return result as ISettings;
    }
    throw new Error();
  }
}

export default SettingsRepository;
