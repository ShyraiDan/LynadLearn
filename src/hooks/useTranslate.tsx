import { useEffect, useState } from 'react'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT_KEY,
  // apiKey: 'sk-xxx',
  dangerouslyAllowBrowser: true
})

const useTranslate = (sourceText: string) => {
  const [targetText, setTargetText] = useState<string | null>('')

  useEffect(() => {
    const handleTranslate = async (sourceText: string) => {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `You will be provided with a sentence. This sentence: 
              ${sourceText}. Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into English
              Do not return anything other than the translated sentence.`
            }
          ]
        })

        const data = response.choices[0].message.content
        setTargetText(data)
      } catch (error) {
        console.error('Error translating text:', error)
      }
    }

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText)
      }, 500) // Delay between responses

      return () => clearTimeout(timeoutId)
    }
  }, [sourceText])

  return targetText
}

export default useTranslate
