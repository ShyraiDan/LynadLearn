import styles from './Spring.module.scss'

export const Spring = ({ right, left }: { right?: string; left?: string }) => {
  return (
    <div className={styles.spring} style={{ right: right, left: left }}>
      <div className={styles.dot}></div>
      <div className={styles['small-dot']}></div>
      <div className={styles.line}></div>
    </div>
  )
}
