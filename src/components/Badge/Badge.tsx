import styles from './Badge.module.scss'

interface IBadge {
  part: string
  className?: string
}

export const Badge = ({ part, className }: IBadge) => {
  return <div className={`${styles.badge} ${styles[part]} ${className}`}>{part}</div>
}
