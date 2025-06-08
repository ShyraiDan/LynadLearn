export const findBookmarkType = (itemType: string) => {
  switch (itemType) {
    case 'lists':
      return 'collection'
    case 'quiz':
      return 'quiz'
    case 'vocabulary':
      return 'vocabulary'
    case 'flashcard':
      return 'flashcard'
    default:
      return ''
  }
}
