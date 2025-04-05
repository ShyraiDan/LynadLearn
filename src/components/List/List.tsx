import styles from './List.module.scss'
import { IList } from '@/interfaces/List.interface'
import Image from 'next/image'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

interface TListProps extends Omit<IList, '_id'> {
  href: string
}

export default function List({ title, image, href }: TListProps) {
  const t = useTranslations('dashboard.lists')

  return (
    <div className={twMerge(styles.container, 'group')}>
      <NavigationLink href={href}>
        <div className={twMerge(styles['image-cont'], 'lg:group-hover:scale-110')}>
          {image && (
            <Image
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/core/collections/${image}`}
              className="rounded"
              alt={title}
              unoptimized
              width={135}
              height={205}
            />
          )}
        </div>
        <span className={twMerge(styles.title, 'dark:text-[#d4d5d6]')}>{t(title)}</span>
      </NavigationLink>
    </div>
  )
}
