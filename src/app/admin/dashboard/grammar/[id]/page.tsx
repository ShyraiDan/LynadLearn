import { getSingleGrammar } from '@/lib/grammar'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import Container from '@/components/ui/Container/Container'
import Link from 'next/link'
import { IGrammarExample } from '@/interfaces/Grammar.interface'
import { AdminGrammarDeleteModal } from '@/components/Admin/AdminGrammarDeleteModal/AdminGrammarDeleteModal'
import { H1, H3, H2, P } from '@/components/ui/Typography/Typography'

import { MdEdit } from 'react-icons/md'

type TSingleGrammarPage = {
  params: {
    id: string
    locale: string
  }
}

async function Grammar({ params }: TSingleGrammarPage) {
  const { data: grammar } = await getSingleGrammar(params.id)

  if (!grammar) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-397px-73px)] w-[calc(100vw-32px)] sm:h-[calc(100vh-193px-81px)] md:h-[calc(100vh-153px-81px)] lg:h-[calc(100vh-97px-81px-32px)] lg:w-[calc(100vw-254px-32px)]">
        <H3 className="mb-4 font-bold text-[1.5rem] dark:text-grey-600">No grammar found. Try to open another list.</H3>
        <Link
          className="flex font-medium items-center justify-center bg-blue-200 text-white-100 px-3 py-1.5 rounded transition-all ease-in-out duration-300
      lg:hover:bg-purple-100"
          href="admin/dashboard/grammar"
        >
          Move to Grammar
        </Link>
      </div>
    )
  }

  return (
    <>
      {grammar && (
        <Container className="relative">
          <H1 className="text-blue-200 text-center font-bold text-lg dark:text-grey-600">{grammar.title}</H1>
          <div className="flex items-center justify-center gap-2 absolute top-0 right-0 bg-white-200 rounded-lg px-2 py-2 dark:bg-[#1D2D4D]">
            <Link href={`/admin/dashboard/grammar/${grammar._id}/edit`}>
              <MdEdit
                size={16}
                className="cursor-pointer duration-150 transition-all ease-in dark:fill-white-100 lg:hover:fill-purple-100 dark:lg:hover:fill-purple-100"
              />
            </Link>
            <AdminGrammarDeleteModal id={grammar._id} />
          </div>
          {grammar.data.description.map((item, i) => (
            <P className="mt-5 text-blue-300 dark:text-grey-600" key={i}>
              {item.en}
            </P>
          ))}

          <div>
            {grammar.data.example.map((item) => (
              <>
                <H2 className="my-3 font-bold text-lg text-blue-200 md:text-2xl dark:text-grey-600">{item.title}</H2>
                <P className="text-blue-300 dark:text-grey-600">{item.description}</P>
                <ul className="flex flex-col w-fit bg-white-200 rounded p-3 mt-2 border-l-4 border-l-blue-200 text-blue-300 dark:bg-[#1D2D4D] dark:border-l-purple-100">
                  {item.examples.map((item: IGrammarExample, i: number) => (
                    <li className="dark:text-grey-600" key={`example-${i}`}>
                      {item.exampleEn}
                    </li>
                  ))}
                </ul>
              </>
            ))}
          </div>
          <div className="mt-7">
            <Link
              className="rounded bg-blue-200 py-2 px-4 font-bold text-white-100 transition-all ease-in-out duration-300 lg:hover:bg-purple-100"
              href={`admin/dashboard/quiz/${grammar._id}`}
            >
              Open Quiz
            </Link>
          </div>
        </Container>
      )}
    </>
  )
}

export default async function SingleGrammarPage({ params }: TSingleGrammarPage) {
  return (
    <Container>
      <Suspense
        fallback={
          <Loader dimensionClass="h-[calc(100vh-397px-73px)] w-[calc(100vw-32px)] sm:h-[calc(100vh-193px-81px)] md:h-[calc(100vh-153px-81px)] lg:h-[calc(100vh-97px-81px-32px)] lg:w-[calc(100vw-254px-32px)]" />
        }
      >
        <Grammar params={params} />
      </Suspense>
    </Container>
  )
}
