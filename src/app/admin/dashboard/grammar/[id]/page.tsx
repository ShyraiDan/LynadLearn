import { getSingleGrammar } from '@/lib/grammar'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import Container from '@/components/ui/Container/Container'
import Link from 'next/link'
import { AdminGrammarEditModal } from '@/components/Admin/AdminGrammarEditModal/AdminGrammarEditModal'
import { IGrammarExample } from '@/interfaces/Grammar.interface'
import { AdminGrammarDeleteModal } from '@/components/Admin/AdminGrammarDeleteModal/AdminGrammarDeleteModal'

type TSingleGrammarPage = {
  params: {
    id: string
    locale: string
  }
}

async function Grammar({ params }: TSingleGrammarPage) {
  const grammar = await getSingleGrammar(params.id)

  if (!grammar) {
    return (
      <div className='flex flex-col items-center justify-center h-[calc(100vh-397px-73px)] w-[calc(100vw-32px)] sm:h-[calc(100vh-193px-81px)] md:h-[calc(100vh-153px-81px)] lg:h-[calc(100vh-97px-81px-32px)] lg:w-[calc(100vw-254px-32px)]'>
        <h3 className='mb-4 font-bold text-[1.5rem] dark:text-grey-600'>No grammar found. Try to open another list.</h3>
        <Link
          className='flex font-medium items-center justify-center bg-blue-200 text-white-100 px-3 py-1.5 rounded transition-all ease-in-out duration-300
      hover:bg-purple-100'
          href='admin/dashboard/grammar'>
          Move to Grammar
        </Link>
      </div>
    )
  }

  return (
    <>
      {grammar && (
        <Container className='relative'>
          <h1 className='text-blue-200 text-center font-bold text-lg dark:text-grey-600'>{grammar.title}</h1>
          <div className='flex items-center justify-center gap-2 absolute top-0 right-0 bg-white-200 rounded-lg px-2 py-2'>
            <AdminGrammarEditModal data={grammar} />
            <AdminGrammarDeleteModal id={grammar._id} />
          </div>
          {grammar.data.description.map((item, i) => (
            <p className='mt-5 text-blue-300 dark:text-grey-600' key={i}>
              {item.en}
            </p>
          ))}

          <div>
            {grammar.data.example.map((item, i) => (
              <>
                <h2 className='my-3 font-bold text-lg text-blue-200 md:text-2xl dark:text-grey-600'>{item.title}</h2>
                <p className='text-blue-300 dark:text-grey-600'>{item.description}</p>
                <ul className='flex flex-col w-fit bg-white-200 rounded p-3 mt-2 border-l-4 border-l-blue-200 text-blue-300 dark:bg-[#1D2D4D] dark:border-l-purple-100'>
                  {item.examples.map((item: IGrammarExample, i: number) => (
                    <li className='dark:text-grey-600' key={`example-${i}`}>
                      {item.exampleEn}
                    </li>
                  ))}
                </ul>
              </>
            ))}
          </div>
          <div className='mt-7'>
            <Link
              className='rounded bg-blue-200 py-2 px-4 font-bold text-white-100 transition-all ease-in-out duration-300 hover:bg-purple-100'
              href={`admin/dashboard/quiz/${grammar.quizId}`}>
              Open Quiz
            </Link>
          </div>
        </Container>
      )}
    </>
  )
}

export default function SingleGrammarPage({ params }: TSingleGrammarPage) {
  return (
    <Container>
      <Suspense
        fallback={
          <Loader dimensionClass='h-[calc(100vh-397px-73px)] w-[calc(100vw-32px)] sm:h-[calc(100vh-193px-81px)] md:h-[calc(100vh-153px-81px)] lg:h-[calc(100vh-97px-81px-32px)] lg:w-[calc(100vw-254px-32px)]' />
        }>
        <Grammar params={params} />
      </Suspense>
    </Container>
  )
}
