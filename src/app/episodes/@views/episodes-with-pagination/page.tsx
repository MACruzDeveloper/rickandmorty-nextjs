'use client'

import { useEffect, useState } from 'react'
import EpisodeListPagination from '@/components/EpisodesList/EpisodesListPagination'
import Pagination from '@/components/Pagination/Pagination'
import styles from './page.module.css'
import { Episodes } from '../../layout'

export default function EpisodesPagination() {
  const [episodes, setEpisodes] = useState<Episodes>()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingData, setIsLoadingData] = useState(false)

  // fetch list of episodes from api
  const fetchListOfEpisodes = async (page: number) => {
    setIsLoadingData(true)

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${page}`
      )
      const data = await response.json()
      setEpisodes(data)
    } catch (error) {
      console.error("Error:", error)
      return await Promise.reject("Unable to fetch data.")
    }

    setIsLoadingData(false)
  }

  useEffect(() => {
    fetchListOfEpisodes(currentPage)
  }, [])

  // Pagination list
  const itemsPerPage = 20
  const paginate = (num: number) => {
    setCurrentPage(num)
    fetchListOfEpisodes(num)
  }

  return (
    <div className={styles.content}>
      <h2 className="title_page">Episodes with Pagination</h2>

      <ul className={styles.list_episodes}>
        {
          episodes?.results?.map((ele) => {
            return <EpisodeListPagination
              key={ele.id}
              elem={ele}
            />
          })
        }
      </ul>

      {
        !isLoadingData && episodes && episodes?.info?.count > itemsPerPage ?

          <Pagination
            currentPage={currentPage}
            totalPages={episodes?.info?.pages}
            totalItems={episodes?.info?.count}
            paginate={paginate}
          /> : null
      }
    </div>
  )
}