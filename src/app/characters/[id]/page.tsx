'use client'

import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import iconLeft from '../../../../public/icons/icon_left.svg'
import { getIdFromUrl } from '@/utils/utils'
import { Character } from '../page'

export default function EpisodePage({ params }: { readonly params: { id: number } }) {
  // get character data using url param from characters list
  const [dataCharacter, setDataCharacter] = useState<Character>()

  const fetchDataCharacter = useCallback(async () => {

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${params.id}`
      )
      const data = await response.json()
      setDataCharacter(data)
    } catch (error) {
      console.error("Error:", error)
      return await Promise.reject("Unable to fetch data.")
    }
  }, [params.id])

  useEffect(() => {
    fetchDataCharacter()
  }, [])

  return (
    <div className={styles.episode}>
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <nav className={styles.link_back}>
            <Link href="/characters">
              <Image
                src={iconLeft}
                width={24}
                height={24}
                alt="left"
              />
              <span>Back to list</span>
            </Link>
          </nav>

          <div className={styles.info}>
            <img 
              src={dataCharacter?.image}
              alt={dataCharacter?.name}
            />

            <div>
              <h1 className={styles.name}>{dataCharacter?.name}</h1>
              <p className={styles.location}>{dataCharacter?.location?.name}</p>
              <p>
                <span className={styles.species}>{dataCharacter?.species} / </span>
                <span className={styles.gender}>{dataCharacter?.gender}</span>
              </p>
            </div>
          </div>

          <div className={styles.episodes}>
            <h2>You can watch me in these episodes:</h2>

            <ul>
              {
                dataCharacter?.episode?.map((epi) => {
                  return <li key={epi}>
                      <Link href={`/episode/${getIdFromUrl(epi)}`}>{epi}</Link>
                    </li>
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
