import styles from './Flashcard.module.scss'

export default async function SingleFlashcardPage({ params }: any) {
  return <div className={styles.container}>{params}</div>
}
