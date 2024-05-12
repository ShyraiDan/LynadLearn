export interface IGrammarTopic {
  id: number
  title: string
  data?: {
    description: Array<string>
    example: Array<{
      title: string
      description: string
      examples: Array<string>
    }>
  }
}

export interface IGrammar {
  id: number
  level: string
  topics: Array<IGrammarTopic>
}
