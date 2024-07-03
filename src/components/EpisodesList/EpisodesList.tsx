'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './episodesList.module.css'
import iconDown from '../../../public/icons/icon_down.svg'
import iconRight from '../../../public/icons/icon_right.svg'

type paramsEpisodeList = {
  elem: string
  episodesBySeason: any
  idx: number
}

const EpisodeList = ({ elem, episodesBySeason, idx }: paramsEpisodeList) => {
  const [seasonOpened, setSeasonOpened] = useState('')

  const toggleSeason = (num: string) => {
    if (seasonOpened !== num) { 
      setSeasonOpened(num)
    } else {
      setSeasonOpened('')
    }
  }

  return <li key={elem} className={seasonOpened === elem ? `${styles.open}` : ''}>
  <div className={styles.top}>
    <button type="button" className="btn" onClick={() => toggleSeason(elem)}>
      <p>Season {elem}</p>
      <Image
        src={iconDown}
        width={24}
        height={25}
        alt="open"
      />
    </button>
  </div>

  <ul className={styles.list_episodes}>
    {
      episodesBySeason[idx].map((item: any) => {
        return <li key={item.id}>
          <Link href={`/episode/${item.id}`}>
            <span>{item.num_episode} | {item.name}</span>
            <Image
              src={iconRight}
              width={24}
              height={24}
              alt="view more"
            />
          </Link>
        </li>
      })
    }
  </ul>
</li>
}

export default EpisodeList