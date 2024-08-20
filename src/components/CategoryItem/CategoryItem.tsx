import styles from './CategoryItem.module.scss'

export default function CategoryItem({ title, cssClass }: { title: string; cssClass: string }) {
  return <div className={`${styles['category-item']} ${styles[cssClass]}`}>{title}</div>
}
