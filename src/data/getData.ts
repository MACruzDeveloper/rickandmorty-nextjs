import 'server-only'
import { cache } from 'react'

export const getEpisodes = cache(async() => {
  const response = await fetch('https://rickandmortyapi.com/api/episode')

  if (!response.ok) {
    throw new Error('Failed to fetch data.')
  }

  return response.json()
})

export const getAllEpisodes = cache(async() => {
    const episodes = await getEpisodes()
    const totalPages = episodes.info.pages
    let temp = []

    for (let i=1;i<=totalPages;i++) {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${i}`)
        const data = await response.json()
        temp.push(...data.results)
      } catch (error) {
        console.error('error: ', error)
        return await Promise.reject('unable to fetch data')
      }
    }
    return temp
})

export const getCharacters = cache(async() => {
  const response = await fetch('https://rickandmortyapi.com/api/character', {
    next: { tags: ['characters'] }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data.')
  }

  return response.json()
})

export const preload = () => {
  void getCharacters()
}