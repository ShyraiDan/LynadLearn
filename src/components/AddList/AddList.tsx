import styles from './AddList.module.scss'

export default function AddList() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.photo}>+</div>
        <p>Word list name</p>
      </div>
    </>
  )
}
