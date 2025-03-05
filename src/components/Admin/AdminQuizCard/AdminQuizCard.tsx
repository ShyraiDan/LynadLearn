import { IGrammarTopic } from '@/interfaces/Grammar.interface'
import Link from 'next/link'
import { H4, P } from '@/components/ui/Typography/Typography'

type TAdminQuizCard = {
  topic: IGrammarTopic
  lang: 'en' | 'ua'
  type: 'grammar' | 'quiz'
}

export default function AdminQuizCard({ topic, lang, type }: TAdminQuizCard) {
  return (
    <Link
      className="flex h-full flex-col cursor-pointer text-lg bg-grey-250 p-2 rounded-lg shadow-md transition-all ease-in-out lg:hover:text-purple-100 lg:hover:bg-grey-200 [&_div]:lg:hover:text-purple-100 [&_p]:lg:hover:text-purple-100 dark:bg-[#18223D] dark:lg:hover:bg-[#1D2D4D] dark:[&_p]:lg:hover:text-grey-600"
      href={`/admin/dashboard/${type}/${topic._id}`}
    >
      <div className="flex justify-between items-start text-blue-200">
        <H4 className="m-0 font-bold text-base duration-150 mb-2 md:text-lg lg:text-xl dark:text-grey-600">
          {lang === 'en' ? topic.title : topic.titleUa}
        </H4>
      </div>
      <P className="m-0 text-sm duration-150 dark:text-grey-600">{topic.data.description[0].en}</P>
    </Link>
  )
}
