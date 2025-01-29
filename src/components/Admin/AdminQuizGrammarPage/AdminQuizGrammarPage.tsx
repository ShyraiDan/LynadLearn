import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { getAllGrammar } from '@/lib/grammar'
import Container from '@/components/ui/Container/Container'
import AdminQuizCard from '@/components/Admin/AdminQuizCard/AdminQuizCard'
import styles from './AdminQuizGrammarPage.module.scss'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import Link from 'next/link'

import { FaPlus } from 'react-icons/fa'

interface IAdminGrammarQuizPage {
  title: string
  type: 'quiz' | 'grammar'
}

async function Page({ title, type }: IAdminGrammarQuizPage) {
  const grammarElementary = await getAllGrammar('A1-A2')

  return (
    <>
      <div className="mb-6 last:mb-0">
        <div className="relative">
          <h2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl dark:text-grey-600">{title}</h2>
          {type === 'grammar' ? (
            <Link
              href="/admin/dashboard/grammar/add"
              className="absolute top-[-4px] right-0 cursor-pointer text-white-100 bg-blue-200 flex items-center justify-center p-3 rounded-2xl transition-all ease-in-out duration-150 hover:bg-purple-100 hover:text-white-100 dark:bg-[#1D2D4D] dark:hover:bg-purple-100 dark:hover:text-white-100"
            >
              <FaPlus size={16} />
            </Link>
          ) : (
            <Link
              href="/admin/dashboard/quiz/add"
              className="absolute top-[-4px] right-0 cursor-pointer text-white-100 bg-blue-200 flex items-center justify-center p-3 rounded-2xl transition-all ease-in-out duration-150 hover:bg-purple-100 hover:text-white-100 dark:bg-[#1D2D4D] dark:hover:bg-purple-100 dark:hover:text-white-100"
            >
              <FaPlus size={16} />
            </Link>
          )}
        </div>

        <div className="grid auto-rows-[10px] gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {grammarElementary.map((item: IGrammarTopic, i) => {
            return (
              <div
                key={item._id.toString()}
                className={`rounded-lg transition-transform duration-300  ${styles[`item-${(i % 8) + 1}`]}`}
              >
                <AdminQuizCard topic={item} lang="en" type={type} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default function AdminGrammarQuizPage({ title, type }: IAdminGrammarQuizPage) {
  return (
    <>
      <Container>
        <Suspense
          fallback={
            <Loader dimensionClass="h-[calc(100vh-397px-73px)] w-[calc(100vw-32px)] sm:h-[calc(100vh-193px-81px)] md:h-[calc(100vh-153px-81px)] lg:h-[calc(100vh-97px-81px-32px)] lg:w-[calc(100vw-254px-32px)]" />
          }
        >
          <Page title={title} type={type} />
        </Suspense>
      </Container>
    </>
  )
}
