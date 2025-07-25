import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { Dark, LocalStorage } from 'quasar';

export const useSettingsStore = defineStore('settings', () => {
  /* state */
  const settings = reactive({
    promptDelete: false,
    darkMode: false, // false | true | 'auto'
  });

  watch(
    () => settings.darkMode,
    (value) => Dark.set(value),
    { immediate: true },
  );

  watch(settings, () => {
    saveSettings();
  })
  /* getters */

  /* actions */
  function loadSettings() {
    const savedSettings = LocalStorage.getItem('settings');
    if (savedSettings) Object.assign(settings, savedSettings);
  }

  // helper functions
  function saveSettings() {
    LocalStorage.set('settings', settings);
  }

  return {
    // state
    settings,
    // getters,
    //actions
    loadSettings
  };
});
