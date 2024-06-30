import styles from './Loader.module.scss'

export default function Loader({ dimensionClass }: any) {
  return (
    <div className={`${styles.preloader} ${dimensionClass}`}>
      <div className={styles.load}>
        <div className={`${styles['preloader-item']} ${styles.first}`}></div>
        <div className={`${styles['preloader-item']} ${styles.second}`}></div>
        <div className={`${styles['preloader-item']} ${styles.third}`}></div>
        <div className={`${styles['preloader-item']} ${styles.fourth}`}></div>
      </div>
    </div>
  )
}
