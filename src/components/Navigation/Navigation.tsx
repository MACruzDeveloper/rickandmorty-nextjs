'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation"
import Image from 'next/image'
import styles from './navigation.module.css'
import useWindowSize from '@/hooks/useWindowSize'
import iconBurger from '../../../public/icons/icon_burger.svg'
import iconClose from '../../../public/icons/icon_close.svg'

export default function Navigation() {
  const pathname = usePathname()
  const windowSize = useWindowSize()
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const toggleMenu = () => {
    !isMenuVisible ? setIsMenuVisible(true) : setIsMenuVisible(false)
  }

  return (
    <nav className={styles.nav}>
      {
        windowSize?.width < 768 ?
          <button onClick={toggleMenu}>
            <Image
              src={ !isMenuVisible ? iconBurger : iconClose}
              width={32}
              height={32}
              alt="menu"
            />
          </button>
          : null
      }

      {
        isMenuVisible || windowSize?.width >= 768 ?
          <ul>
            <li><Link href="/" className={pathname === "/" ? styles.active : ""}>Home</Link></li>
            <li><Link href="/episodes" className={pathname.includes("/episodes") ? styles.active : ""}>Episodes</Link></li>
            <li><Link href="/characters" className={pathname === "/characters" ? styles.active : ""}>Characters</Link></li>
          </ul>
          : null
      }
    </nav>
  )
}