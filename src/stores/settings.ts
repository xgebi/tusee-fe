import { defineStore } from 'pinia';
import type ITask from '@/interfaces/ITask';
import TaskService from '@/services/Task.service';
import _ from 'lodash';
import type ISettings from '@/interfaces/ISettings';
import SettingsService from '@/services/Settings.service';

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () =>
    ({
      registrationEnabled: true,
    } as ISettings),
  getters: {
    getRegistrationEnabled: (state) => state.registrationEnabled,
  },
  actions: {
    async fetchSettings() {
      const settings = await SettingsService.getSettings();
      console.log(settings);
      if (settings) {
        this.registrationEnabled = settings.registrationEnabled;
      }
    },
  },
});
