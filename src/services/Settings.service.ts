import type ISettings from '@/interfaces/ISettings';
import SettingsRepository from '@/repositories/Settings.repository';

class SettingsService {
  public static async getSettings(): Promise<ISettings> {
    const settings = await SettingsRepository.getSettings();
    return {
      registrationEnabled: this.toBoolean(
        settings.find(
          (setting) => setting.settingsName === 'registrationEnabled'
        )?.settingsValue
      ),
    };
  }

  private static toBoolean(val: string | undefined): boolean {
    return val?.toLowerCase() === 'boolean';
  }
}

export default SettingsService;
