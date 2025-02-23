import { getAllAchievements } from '@/lib/achievements'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { AdminAchievementCard } from '@/components/Admin/AdminAchievementCard/AdminAchievementCard'
import { H2 } from '@/components/ui/Typography/Typography'
import Link from 'next/link'

import { FaPlus } from 'react-icons/fa'

async function Achievements() {
  const achievements = await getAllAchievements()

  return (
    <>
      <div className="relative">
        <H2 className="text-center text-xl font-bold text-blue-200 my-4 sm:text-2xl dark:text-grey-600">
          Achievements
        </H2>
        <Link
          href="/admin/dashboard/achievements/add"
          className="absolute top-[12px] right-0 cursor-pointer text-white-100 bg-blue-200 flex items-center justify-center p-3 rounded-2xl transition-all ease-in-out duration-150 hover:bg-purple-100 hover:text-white-100 dark:bg-[#1D2D4D] dark:hover:bg-purple-100 dark:hover:text-white-100"
        >
          <FaPlus size={16} />
        </Link>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {achievements.map((item) => (
          <AdminAchievementCard item={item} key={item._id} />
        ))}
      </div>
    </>
  )
}

export default function AchievementesPage() {
  return (
    <>
      <div className="flex flex-col p-4 h-full min-h-screen">
        <Suspense
          fallback={
            <Loader
              dimensionClass="h-[calc(100vh-397px-73px)] 
              sm:h-[calc(100vh-193px-81px)] 
              md:h-[calc(100vh-153px-81px)] 
              lg:h-[calc(100vh-97px-81px)] lg:w-[calc(100vw-254px-32px)]"
            />
          }
        >
          <Achievements />
        </Suspense>
      </div>
    </>
  )
}
