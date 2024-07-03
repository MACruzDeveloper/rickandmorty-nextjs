'use client'

import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Carousel from '../../../components/Carousel/carousel'
import styles from './page.module.css'
import iconLeft from '../../../../public/icons/icon_left.svg'
import { Episode } from '@/app/episodes/layout' 

export default function EpisodePage({ params }: { readonly params: { id: number } }) {
  const [charactersFiltered, setCharactersFiltered] = useState([] as any)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [numCharacters, setNumCharacters] = useState(0)

  // get episode data using url param from episodes list
  const [dataEpisode, setDataEpisode] = useState<Episode>()

  const fetchDataEpisode = useCallback(async () => {
    setIsLoadingData(true)

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${params.id}`
      )
      const data = await response.json()
      setDataEpisode(data)
      setNumCharacters(data.characters.length)
      fetchImagesFromCharacters(data.characters)
    } catch (error) {
      console.error("Error:", error)
      return await Promise.reject("Unable to fetch data.")
    }
  }, [])

  useEffect(() => {
    fetchDataEpisode()
  }, [])

  // filter characters of this episode from the store list and save it in state
  const fetchImagesFromCharacters = async (arr: Array<string>) => {
    for (const url of arr) {
      try {
        const response = await fetch(url)
        const data = await response.json()

        if (charactersFiltered.length === 0) {
          setCharactersFiltered((prevState: any) => [...prevState, data])
        }
      } catch (error) {
        console.error('error: ', error)
        return await Promise.reject('unable to fetch data')
      }
    }

    setIsLoadingData(false)
  }

  return (
    <div className={styles.episode}>
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <nav className={styles.link_back}>
            <Link href="/episodes">
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
            <p>
              <span className={styles.number}>{dataEpisode?.episode} / </span>
              <span className={styles.date}>{dataEpisode?.air_date}</span>
            </p>
            <h1 className={styles.name}>{dataEpisode?.name}</h1>
          </div>
        </div>
      </div>

      <Carousel
        isLoadingData={isLoadingData}
        numCharacters={numCharacters}
        charactersFiltered={charactersFiltered}
      />
    </div>
  )
}
