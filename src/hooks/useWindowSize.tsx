import { useState, useEffect } from 'react'

type ScreenSize = {
  width: number
  height: number
}

const useWindowSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const handleResize = (): void => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return (): void => window.removeEventListener('resize', handleResize)
  }, [])

  return screenSize
}

export default useWindowSize