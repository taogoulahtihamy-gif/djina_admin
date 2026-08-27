import {
  useCallback,
  useState,
} from 'react'

import BrandIntro from './BrandIntro'

import Login from '../pages/Login'

function LoginBrandGate() {
  const [
    showIntro,
    setShowIntro,
  ] = useState(true)

  const handleIntroComplete =
    useCallback(
      () => {
        setShowIntro(false)
      },
      [],
    )

  return (
    <>
      <Login />

      {showIntro && (
        <BrandIntro
          onComplete={
            handleIntroComplete
          }
        />
      )}
    </>
  )
}

export default LoginBrandGate
