import { getAllAchievements } from '@/lib/achievements'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { AdminAchievementCard } from '@/components/Admin/AdminAchievementCard/AdminAchievementCard'

async function Achievements() {
  const achievements = await getAllAchievements()

  return (
    <>
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
