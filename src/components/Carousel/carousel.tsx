'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import styles from './carousel.module.css'
import useWindowSize from '@/hooks/useWindowSize'
import iconLeft from '../../../public/icons/icon_left.svg'
import iconRight from '../../../public/icons/icon_right.svg'

type paramsCarousel = {
  isLoadingData: boolean
  numCharacters: number
  charactersFiltered: [{
    id: number
    image: string
    name: string
  }]
}

const Carousel = ({ isLoadingData, numCharacters, charactersFiltered }: paramsCarousel) => {
  const windowSize = useWindowSize()
  // ref for carousel ul
  const ref = useRef<HTMLUListElement>(null)
  const [currentPosition, setCurrentPosition] = useState(0)

  // For mobile & desktop => 108px = 98px thumbs width + 10px margin right
  // For desktop => 1200px width container, we just need its right half part
  const numItemsMobile = windowSize.width / 108
  const numItemsDesktop = ((windowSize.width - ((windowSize.width - 1200)/2)) / 108)
  const itemsToScroll = windowSize.width < 1200 ? Math.round(numCharacters / numItemsMobile) : Math.trunc(numCharacters / numItemsDesktop)

  const goToLeft = () => {
    if (currentPosition === 0) return
    else {
      setCurrentPosition(currentPosition - 1)
      ref.current!.style.transform = `translateX(-${currentPosition - 1}00%)`
    }
  }

  const goToRight = () => {
    if (currentPosition >= itemsToScroll) return
    else {
      setCurrentPosition(currentPosition + 1)
      ref.current!.style.transform = `translateX(-${currentPosition + 1}00%)`
    }
  }

  return <div className={styles.carousel}>
    <div className="container">
      <h2 className={styles.title}>Characters</h2>

      <ul className="flex" ref={ref}>
        {
          !isLoadingData ?
            charactersFiltered?.map((ele) => {
              return <li key={ele.id}>
                <Image 
                  src={ele.image} 
                  width={98}
                  height={98}
                  alt={ele.name} 
                />
                <span className={styles.name}>{ele.name}</span>
              </li>
            }) : <p>loading...</p>
        }
      </ul>

      <div className={styles.buttons}>
        <button
          type="button"
          className="btn_icon prev"
          onClick={goToLeft}
          disabled={currentPosition === 0}
        >
          <Image 
            src={iconLeft} 
            width={52}
            height={52}
            alt="left" 
          />
        </button>
        <button
          type="button"
          className="btn_icon next"
          onClick={goToRight}
          disabled={currentPosition >= itemsToScroll}
        >
          <Image 
            src={iconRight} 
            width={52}
            height={52}
            alt="right" 
          />
        </button>
      </div>
    </div>
  </div>
}

export default Carousel
