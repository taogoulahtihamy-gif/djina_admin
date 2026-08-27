const INTRO_SESSION_KEY =
  'djina-brand-intro-seen'

export function hasSeenDjinaIntro() {
  return (
    sessionStorage.getItem(
      INTRO_SESSION_KEY,
    ) === 'true'
  )
}

export function markDjinaIntroAsSeen() {
  sessionStorage.setItem(
    INTRO_SESSION_KEY,
    'true',
  )
}
