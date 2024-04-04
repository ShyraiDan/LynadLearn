interface IGrammarTopic {
  id: number
  title: string
}

export interface IGrammar {
  id: number
  level: string
  topics: Array<IGrammarTopic>
}
