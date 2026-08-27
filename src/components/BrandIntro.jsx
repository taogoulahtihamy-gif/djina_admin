import {
  useEffect,
  useState,
} from 'react'

function BrandIntro({
  onComplete,
}) {
  const [
    isLeaving,
    setIsLeaving,
  ] = useState(false)

  useEffect(() => {
    const leaveTimer =
      window.setTimeout(
        () => {
          setIsLeaving(true)
        },
        2550,
      )

    const completeTimer =
      window.setTimeout(
        () => {
          onComplete?.()
        },
        2900,
      )

    return () => {
      window.clearTimeout(
        leaveTimer,
      )

      window.clearTimeout(
        completeTimer,
      )
    }
  }, [
    onComplete,
  ])

  return (
    <div
      className={`djina-brand-intro ${
        isLeaving
          ? 'is-leaving'
          : ''
      }`}
      aria-hidden="true"
    >
      <div className="djina-intro-glow djina-intro-glow--one" />

      <div className="djina-intro-glow djina-intro-glow--two" />

      <div className="djina-intro-content">
        <div className="djina-intro-logo-shell">
          <img
            className="djina-intro-logo"
            src="/brand/djina-logo.png"
            alt=""
          />
        </div>

        <div className="djina-intro-title">
          DJINA
        </div>

        <div className="djina-intro-tagline">
          Votre trajet en un clic
        </div>

        <div className="djina-intro-route">
          <span className="djina-intro-route-line" />

          <span className="djina-intro-route-car" />

          <span className="djina-intro-route-line" />
        </div>

        <div className="djina-intro-location">
          N'Djamena · Tchad
        </div>
      </div>

      <div className="djina-intro-corner djina-intro-corner--top" />

      <div className="djina-intro-corner djina-intro-corner--bottom" />
    </div>
  )
}

export default BrandIntro
