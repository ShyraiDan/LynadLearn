import styles from './LanguageModal.module.scss'

export default function LanguageModal() {
  return (
    <div className={styles.modal}>
      <ul>
        <li>English</li>
        <li>Ukrainian</li>
      </ul>
    </div>
  )
}
