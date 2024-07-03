'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './episodesListPagination.module.css'
import iconRight from '../../../public/icons/icon_right.svg'

type EpisodeListPagination = {
  episode?: string
  name?: string
  air_date?: string
  id: number
}

type paramsEpisodeListPagination = {
  elem: EpisodeListPagination
}

const EpisodeListPagination = ({ elem }: paramsEpisodeListPagination) => {

  return <li className={styles.episode}>
    <p>
      <span className={styles.name}>{elem.episode}: <strong>{elem.name}</strong></span>
      <span className={styles.date}>{elem.air_date}</span>
    </p>
    <Link href={`/episode/${elem.id}`}>
      <Image
        src={iconRight}
        width={24}
        height={24}
        alt="view more"
      />
    </Link>
  </li>
}

export default EpisodeListPagination