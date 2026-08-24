const STORAGE_KEY = 'djina-appearance'

const VALID_APPEARANCES = [
  'light',
  'dark',
  'system',
]

let systemListenerInstalled = false

function isValidAppearance(value) {
  return VALID_APPEARANCES.includes(
    value,
  )
}

export function getAppearance() {
  const saved =
    localStorage.getItem(
      STORAGE_KEY,
    )

  return isValidAppearance(saved)
    ? saved
    : 'dark'
}

export function resolveAppearance(
  appearance,
) {
  if (appearance === 'system') {
    return window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
      ? 'dark'
      : 'light'
  }

  return appearance
}

export function applyAppearance(
  appearance,
  {
    persist = true,
  } = {},
) {
  const preference =
    isValidAppearance(appearance)
      ? appearance
      : 'dark'

  const resolved =
    resolveAppearance(
      preference,
    )

  if (persist) {
    localStorage.setItem(
      STORAGE_KEY,
      preference,
    )
  }

  document.documentElement.dataset.appearance =
    preference

  document.documentElement.dataset.theme =
    resolved

  document.documentElement.style.colorScheme =
    resolved

  return resolved
}

export function initializeAppearance() {
  const appearance =
    getAppearance()

  applyAppearance(
    appearance,
    {
      persist: false,
    },
  )

  if (
    systemListenerInstalled
  ) {
    return
  }

  systemListenerInstalled = true

  const media =
    window.matchMedia(
      '(prefers-color-scheme: dark)',
    )

  media.addEventListener(
    'change',
    () => {
      const current =
        getAppearance()

      if (
        current === 'system'
      ) {
        applyAppearance(
          'system',
          {
            persist: false,
          },
        )
      }
    },
  )
}