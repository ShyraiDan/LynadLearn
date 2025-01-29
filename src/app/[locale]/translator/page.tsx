'use client'

import 'regenerator-runtime/runtime'
import { useState, ChangeEvent } from 'react'
import SpeechRecognitionComponent from '@/components/Translator/SpeechRecognition'
import TextArea from '@/components/ui/TextArea/TextArea'
import FileUpload from '@/components/Translator/FileUpload'
import LinkPaste from '@/components/Translator/LinkPaste'
import useTranslate from '@/hooks/useTranslate'
import { rtfToText } from '@/utils/rtfToText'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { FaVolumeHigh } from 'react-icons/fa6'
import { MdContentCopy } from 'react-icons/md'
import SnackBar from '@/components/ui/SnackBar/SnackBar'

export default function TranslatorPage() {
  const [sourceText, setSourceText] = useState<string>('')
  const t = useTranslations('translator')

  const targetText = useTranslate(sourceText)

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const rtfContent = reader.result as string
        const text = rtfToText(rtfContent)
        setSourceText(text)
      }
      reader.readAsText(file)
    }
  }

  const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value
    try {
      const response = await fetch(link)
      const data = await response.text()
      setSourceText(data)
    } catch (error) {
      console.error('Error fetching link content:', error)
    }
  }

  const handleCopyToClipboard = async () => {
    if (targetText) {
      await navigator.clipboard.writeText(targetText)
      toast.success('Text copied to clipboard', {
        duration: 3000,
        className: 'border text-white-100 border-green-100 bg-green-100'
      })
    } else {
      toast.error('No text to copy', {
        duration: 3000,
        className: 'border text-white-100 border-red bg-red'
      })
    }
  }

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <>
      <div className="w-full">
        <div className="overflow-hidden h-screen">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24 max-w-[1320px]">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold dark:text-grey-600">
                Lynad<span className="text-[#7c68ee]">Translate</span>
              </h1>
              <p className="mt-3 dark:text-grey-600">{t('slogan')}</p>
              <div className="mt-7 sm:mt-12 mx-auto">
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div className="z-10 flex flex-col p-3 border rounded-lg shadow-lg dark:border-[#ffffff20]">
                    <TextArea
                      id="source-language"
                      value={sourceText}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSourceText(e.target.value)}
                      placeholder={t('source_language')}
                    />
                    <div className="flex flex-row justify-between w-full mt-3">
                      <span className="cursor-pointer flex space-x-2 flex-row">
                        <SpeechRecognitionComponent setSourceText={setSourceText} />
                        <FaVolumeHigh
                          size={22}
                          className="text-gray-400"
                          onClick={() => handleAudioPlayback(sourceText)}
                        />
                        <FileUpload handleFileUpload={handleFileUpload} />
                        <LinkPaste handleLinkPaste={handleLinkPaste} />
                      </span>
                      <span className="text-sm pr-4 dark:text-grey-600">{sourceText.length} / 2000</span>
                    </div>
                  </div>
                  <div className="z-10 flex flex-col p-3 border rounded-lg shadow-lg dark:border-[#ffffff20]">
                    <TextArea
                      id="target-language"
                      value={targetText || ''}
                      onChange={() => {}}
                      placeholder={t('target_language')}
                    />
                    <div className="flex flex-row justify-between w-full mt-3">
                      <span className="cursor-pointer flex items-center flex-row">
                        <FaVolumeHigh
                          className="text-gray-400"
                          size={22}
                          onClick={() => handleAudioPlayback(targetText || '')}
                        />
                      </span>
                      <div className="flex flex-row items-center  pr-4 cursor-pointer">
                        <MdContentCopy className="text-gray-400" size={22} onClick={handleCopyToClipboard} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SnackBar />
    </>
  )
}
