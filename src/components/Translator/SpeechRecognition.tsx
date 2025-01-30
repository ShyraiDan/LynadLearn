import { useEffect, Dispatch, SetStateAction } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import { FaMicrophone } from 'react-icons/fa'

interface ISpeechRecognitionProps {
  setSourceText: Dispatch<SetStateAction<string>>
}

const SpeechRecognitionComponent = ({ setSourceText }: ISpeechRecognitionProps) => {
  const { transcript, listening } = useSpeechRecognition()

  useEffect(() => {
    setSourceText(transcript)
  }, [transcript, setSourceText])

  const handleVoiceRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.startListening({ continuous: true })
    }
  }

  return (
    <div>
      <FaMicrophone size={22} className="text-gray-400" onClick={handleVoiceRecording} />
    </div>
  )
}

export default SpeechRecognitionComponent
