import { Suspense } from 'react'
import { getSingleAchievements } from '@/lib/achievements'
import { AchievementsEditForm } from '@/components/forms/AchievementsEditForm/AchievementsEditForm'
import Container from '@/components/ui/Container/Container'
import Loader from '@/components/Loader/Loader'

interface IEditAchievementsPageProps {
  params: { id: string }
}

export default async function EditAchievementsPage({ params }: IEditAchievementsPageProps) {
  const { id: achievementId } = params

  const { data } = await getSingleAchievements(achievementId)

  return (
    <Container>
      <Suspense>
        {data ? (
          <AchievementsEditForm data={data} />
        ) : (
          <Loader
            dimensionClass="h-[calc(100vh-397px-81px)]
            sm:h-[calc(100vh-193px-81px)] 
            md:h-[calc(100vh-153px-81px)] 
            lg:h-[calc(100vh-97px-81px)]"
          />
        )}
      </Suspense>
    </Container>
  )
}
