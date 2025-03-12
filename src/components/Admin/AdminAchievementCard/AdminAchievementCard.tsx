import { IAchievement } from '@/interfaces/Achievements.interface'
import { H6, P } from '@/components/ui/Typography/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { AdminAchievementsDelete } from '@/components/Admin/AdminAchievementsDelete/AdminAchievementsDelete'

import { MdEdit } from 'react-icons/md'

interface IAdminAchievementCardProps {
  item: IAchievement
}

export const AdminAchievementCard = ({ item }: IAdminAchievementCardProps) => {
  return (
    <div
      className="flex flex-col items-center p-4 rounded-3xl bg-grey-250 shadow-md relative 
    dark:bg-[#1D2D4D] 
      [&_div]:transition-all [&_div]:ease-linear [&_div]:duration-250 
      [&_div]:lg:hover:opacity-100"
    >
      <div className="h-[60px] w-[60px] rounded-full bg-blue-225 shadow-md flex items-center justify-center text-blue-200 text-3xl">
        <Image
          src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/core/achievements/${item.image}`}
          alt={item.title}
          width={20}
          height={20}
          className="dark:invert"
        />
        <div />
      </div>
      <H6 className="text-[16px] dark:text-grey-600 !mb-2 !mt-1">{item.title}</H6>
      <P className="text-[12px] text-center leading-6 dark:text-grey-600">{item.description}</P>
      <div className="flex absolute gap-2 top-0 right-0 w-[75px] h-[30px] rounded-tr-3xl rounded-bl-3xl p-2 bg-[#2a41e812] opacity-0 pl-[18px] shadow-lg">
        <Link href={`/admin/dashboard/achievements/${item._id}/edit`}>
          <MdEdit
            size={16}
            className="cursor-pointer duration-150 transition-all ease-in dark:fill-white-100 lg:hover:fill-purple-100 dark:lg:hover:fill-purple-100"
          />
        </Link>
        <AdminAchievementsDelete id={item._id} />
      </div>
    </div>
  )
}
