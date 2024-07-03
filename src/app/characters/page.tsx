'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import styles from './page.module.css'
import Pagination from '@/components/Pagination/Pagination'

type Info = {
  count: number
  pages: number
}

export type Character = {
  readonly id: number
  name: string
  species?: string
  gender?: string
  location: {
    name: string
  }
  image: string
  episode: []
}

type Characters = {
  info: Info
  results: Array<Character>
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Characters>()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingData, setIsLoadingData] = useState(false)

  // fetch list of characters from api
  const fetchListOfCharacters = async (page: number) => {
    setIsLoadingData(true)

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      )
      const data = await response.json()
      setCharacters(data)
    } catch (error) {
      console.error("Error:", error)
      return await Promise.reject("Unable to fetch data.")
    }

    setIsLoadingData(false)
  }

  useEffect(() => {
    fetchListOfCharacters(currentPage)
  }, [])

  // Pagination list
  const itemsPerPage = 20
  const paginate = (num: number) => {
    setCurrentPage(num)
    fetchListOfCharacters(num)
  }

  return (
    <div className={styles.characters}>
      <div className={`${styles.container} container`}>
        <div className={styles.top}>
          <h2 className="title_page">Characters</h2>
        </div>

        <ul className={styles.list_characters}>
          {
            characters?.results?.map((elem) => {
              return <li key={elem.id}>
                <Link href={`/characters/${elem.id}`}>
                  <Image
                    src={elem.image}
                    width={128}
                    height={128}
                    alt={elem.name}
                  />

                  <p className={styles.info}>
                    <span className={styles.name}>{elem.name}</span>
                    <span className={styles.species}>({elem.species})</span>
                  </p>
                </Link>
              </li>
            })
          }
        </ul>

        {
          !isLoadingData && characters && characters?.info?.count > itemsPerPage ?

            <Pagination
              currentPage={currentPage}
              totalPages={characters?.info?.pages}
              totalItems={characters?.info?.count}
              paginate={paginate}
            /> : null
        }
      </div>
    </div>
  )
}