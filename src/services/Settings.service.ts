import type ISettings from '@/interfaces/ISettings';
import SettingsRepository from '@/repositories/Settings.repository';
import type {
  IReceivedSettingsItem,
  ISettingsItem,
} from '@/interfaces/ISettingsResponse';

class SettingsService {
  public static async getSettings(): Promise<ISettings> {
    const settings: IReceivedSettingsItem[] =
      await SettingsRepository.getSettings();
    return {
      registrationEnabled: this.toBoolean(
        settings
          .map((setting) => this.normalizeSettingsForFe(setting))
          .find((setting) => setting.settingsName === 'registrationEnabled')
          ?.settingsValue
      ),
    };
  }

  private static toBoolean(val: string | undefined): boolean {
    return val?.toLowerCase() === 'true';
  }

  private static normalizeSettingsForFe(
    settings: IReceivedSettingsItem
  ): ISettingsItem {
    return {
      displayName: settings.display_name,
      settingsName: settings.settings_name,
      settingsValue: settings.settings_value,
      settingsValueType: settings.settings_value_type,
    };
  }
}

export default SettingsService;
