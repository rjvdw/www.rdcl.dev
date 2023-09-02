import { computed, signal } from '@preact/signals'
import { callApi, getBody } from '../../util/http'
import { auth } from '../auth'
import { isUserSettings, UserSettings } from './types'

const partialSettings = signal<Partial<UserSettings> | null>(null)

export const settings = computed<UserSettings>(() => {
  return {
    dateStyle: partialSettings.value?.dateStyle ?? 'medium',
    timeStyle: partialSettings.value?.timeStyle ?? 'medium',
    hour12: partialSettings.value?.hour12 ?? false,
  }
})

auth.subscribe(() => {
  void loadSettings()
})

export async function loadSettings() {
  if (!auth.value.loggedIn) {
    partialSettings.value = null
    return
  }

  const response = await callApi('get', '/settings', true)
  partialSettings.value = await getBody(response, isUserSettings)
}

export async function updateSettings(newValue: Partial<UserSettings>) {
  await callApi('post', '/settings', true, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newValue),
  })

  await loadSettings()
}
