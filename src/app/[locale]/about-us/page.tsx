import Image from 'next/image'
import styles from './AboutUsPage.module.scss'

import image from '@/assets/about-us.png'

export default function AboutUsPage() {
  return (
    <div className={styles.container}>
      <section className={styles.top}>
        <h6>What is our goal</h6>
        <h1>To improve language learning process with the help of AI</h1>
        <p>
          We believe modern learning means a user-centric approach with the help of all kinds of contents available on
          the internet. Our mission is to create an AI based platform to make learning more fun and customized.
        </p>
        <div>
          <Image src={image} alt='About LynadLearn' />
        </div>
      </section>
      <div className={styles.main}>
        <section>
          <h2>How can AI help?</h2>
          <p>
            A substantial part of learning a new language includes a constant search for new content to learn and
            keeping track of everything that you have learned.
          </p>
          <p>
            With the help of AI this process can be fully automated, decreasing the time it takes to learn a new
            language substantially.
          </p>
          <p>
            To put it simply, we provide you with what you need to learn for the next step and help you use it in the
            real world.
          </p>
        </section>
        <section>
          <h2>Why is learning a new language difficult?</h2>
          <p>Languages are these huge chunks of content and to learn a new one needs a lot of time and dedication. </p>
          <p> To learn a new language at an advanced level (at least C1) you need to learn about 10000 new words.</p>
          <p>
            It is always fun to start learning but to maintain this process needs strong determination that not everyone
            has.
          </p>
          <p> If only there was a way to learn languages faster and easier.</p>
        </section>
      </div>
      <section className={styles.last}>
        <h2>Who are we?</h2>
        <p>
          We are a team of software developers and language experts with years of experience in designing and developing
          large-scale language learning platforms and products. We came to the realization that AI can help learners in
          many ways and are determined to change the way languages are taught and learned.
        </p>
      </section>
    </div>
  )
}
