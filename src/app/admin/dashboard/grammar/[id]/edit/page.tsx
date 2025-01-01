'use client'

import { useEffect, useState } from 'react'
import { AdminGrammarAddEditForm } from '@/components/Admin/AdminGrammarAddEditForm/AdminGrammarAddEditForm'
import { getSingleGrammar } from '@/lib/grammar'
import { IGrammarTopic } from '@/interfaces/Grammar.interface'

export default function AdminAddGrammarPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<IGrammarTopic | null>(null)

  useEffect(() => {
    getSingleGrammar(params.id).then((res) => {
      res && setData(res)
    })
  }, [params.id])

  return <div>{data && <AdminGrammarAddEditForm data={data} />}</div>
}
