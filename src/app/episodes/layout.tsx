'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import Tabs from "@/components/Tabs/tabs"
import { usePathname } from "next/navigation"
import styles from './page.module.css'
import iconDown from '../../../public/icons/icon_down_circle.svg'

type Info = {
  count: number
  pages: number
}

export type Episode = {
  readonly id: number
  name: string
  air_date?: string
  episode?: string
  characters: []
}

export type Episodes = {
  info: Info
  results: Array<Episode>
}

export default function EpisodesLayout({
  children,
  views
}: {
  readonly children: ReactNode
  readonly views: ReactNode
}) {
  const pathname = usePathname()

  return (
    <section className={styles.episodes}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.top}>
            <h2 className={styles.title}>Select the type<br /> of episodes list</h2>
          </div>

          <div className={`${styles.arrow} ${pathname === '/episodes' ? styles.animated : ''}`}>
            <Image
              src={iconDown}
              width={58}
              height={58}
              alt="go down"
            />
          </div>

          <Tabs
            titles={['Episodes By Season', 'Episodes with Pagination']}
            hrefs={['/episodes/episodes-by-season', '/episodes/episodes-with-pagination']}
            tabs={['tab1', 'tab2']}
          />
          {children}
          {views}
        </div>
      </div>
    </section>
  )
}