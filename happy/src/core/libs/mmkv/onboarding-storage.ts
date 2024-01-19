import { MMKV } from 'react-native-mmkv'

const ONBOARDING_KEY = 'onboarding_status';

export const storage = new MMKV({
  id: 'onboarding',
})

function getOnboarding() {
  return storage.getBoolean(ONBOARDING_KEY);
}

function setOnboarding(status: boolean) {
  return storage.set(ONBOARDING_KEY, JSON.stringify(status));
}

export const STORAGE_ONBOARDING = {
  get: getOnboarding,
  set: setOnboarding
}
