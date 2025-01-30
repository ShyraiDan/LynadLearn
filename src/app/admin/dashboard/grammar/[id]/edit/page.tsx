'use client'

import { useEffect, useState } from 'react'
import { AdminGrammarAddEditForm } from '@/components/Admin/AdminGrammarAddEditForm/AdminGrammarAddEditForm'
import { getSingleGrammar } from '@/lib/grammar'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'

export default function AdminAddGrammarPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<IGrammarTopic | null>(null)

  useEffect(() => {
    getSingleGrammar(params.id).then((res) => {
      if (res) {
        setData(res)
      }
    })
  }, [params.id])

  //TODO: Show some warning if there is no data

  return <div>{data && <AdminGrammarAddEditForm data={data} />}</div>
}
