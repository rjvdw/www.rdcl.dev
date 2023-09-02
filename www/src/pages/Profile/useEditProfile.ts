import { useState } from 'preact/hooks'
import { updateSettings as actualUpdateSettings } from '../../state/settings'
import { UserSettings } from '../../state/settings/types'
import { useFormHandler } from '../../util/form'
import { Api, asParams, getBody, useApi } from '../../util/http'
import { DATE_STYLES, TIME_STYLES } from './constants'
import { isUserProfile, UserProfile } from './types'

export function useEditProfile(setData: (data: UserProfile) => void) {
  const [pending, setPending] = useState(false)
  const api = useApi(true)

  const { error, onSubmit } = useFormHandler(async (event, { setError }) => {
    const profileBody = asParams(event.target)
    const settingsBody: Record<string, string | null> = {}

    for (const key of Array.from(profileBody.keys())) {
      if (key.startsWith('profile:')) {
        settingsBody[key.substring('profile:'.length)] = profileBody.get(key)
        profileBody.delete(key)
      }
    }

    setPending(true)
    setError(undefined)
    try {
      const profilePromise = updateProfile(api, profileBody)
      await updateSettings(settingsBody)

      setData(await profilePromise)
    } finally {
      setPending(false)
    }
  }, [])

  return {
    pending,
    error,
    onSubmit,
  }
}

async function updateProfile(
  api: Api,
  body: URLSearchParams,
): Promise<UserProfile> {
  const response = await api.patch('/auth/me', body)
  return getBody(response, isUserProfile)
}

async function updateSettings(body: Record<string, string | null>) {
  const settings: Partial<UserSettings> = {}

  if (isDateStyle(body.dateStyle)) settings.dateStyle = body.dateStyle
  if (isTimeStyle(body.timeStyle)) settings.timeStyle = body.timeStyle
  if (body.hour12) settings.hour12 = body.hour12 === 'true'

  await actualUpdateSettings(settings)
}

function isDateStyle(
  value: unknown,
): value is Intl.DateTimeFormatOptions['dateStyle'] {
  return DATE_STYLES.find((v) => v === value) !== undefined
}

function isTimeStyle(
  value: unknown,
): value is Intl.DateTimeFormatOptions['timeStyle'] {
  return TIME_STYLES.find((v) => v === value) !== undefined
}
