import { useWindowSize } from '@/hooks/useWindowSize'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

interface ConfettiContainerProps {
  isVisible: boolean
}

export const ConfettiContainer = ({ isVisible }: ConfettiContainerProps) => {
  const { width, height } = useWindowSize()
  const [isConfettiVisible, setConfettiVisible] = useState(false)
  useEffect(() => {
    if (isVisible) {
      setConfettiVisible(true)

      setTimeout(() => {
        setConfettiVisible(false)
      }, 10000)
    }
  }, [isVisible])

  return (
    <>
      {isVisible && (
        <div className="absolute top-0 left-0 w-full h-full z-20">
          <Confetti recycle={isConfettiVisible} width={width} height={height} />
        </div>
      )}
    </>
  )
}
