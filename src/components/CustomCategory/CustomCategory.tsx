import styles from './CustomCategory.module.scss'
import { ICategory } from '@/interfaces/Category.interface'
import { useTranslations } from 'next-intl'
import CategoryDescription from '../Category/components/CategoryDescription/CategoryDescription'
import AddList from '../AddList/AddList'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import CustomList from '../CustomList/CustomList'
import NavigationLink from '../ui/NavigationLink/NavigationLink'

export default function CustomCategory({ title, _id, lists, description }: ICategory) {
  const t = useTranslations()

  return (
    <div className={styles.container}>
      <div>
        <CategoryDescription title={t('your_lists')} description={''} />
        <div className={styles['list-group']}>
          <AddList />
          {/* <Swiper
            pagination={true}
            modules={[Pagination]}
            className={styles.slider}
            spaceBetween={10}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 2
              },
              400: {
                slidesPerView: 3
              },
              510: {
                slidesPerView: 4
              },
              576: {
                slidesPerView: 3
              },
              700: {
                slidesPerView: 4
              },
              768: {
                slidesPerView: 2
              },
              840: {
                slidesPerView: 3
              },
              992: {
                slidesPerView: 4
              },
              1150: {
                slidesPerView: 5
              },
              1300: {
                slidesPerView: 6
              },
              1450: {
                slidesPerView: 7
              },
              1600: {
                slidesPerView: 8
              }
            }}> */}
          {lists.map((item: any) => (
            // <SwiperSlide key={item._id}>
            <NavigationLink key={item._id} href={`/dashboard/vocabulary/${item._id}`}>
              <CustomList title={item.title} image={item.image} />
            </NavigationLink>
            // </SwiperSlide>
          ))}
          {/* </Swiper> */}
        </div>
      </div>
    </div>
  )
}
