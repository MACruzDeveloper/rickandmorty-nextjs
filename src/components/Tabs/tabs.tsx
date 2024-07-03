'use client'

import { usePathname } from "next/navigation"
import styles from './tabs.module.css'

type paramsTabs = {
  titles: Array<string>
  hrefs: Array<string>
  tabs: Array<string>
}

const Tabs = ({
  titles,
  hrefs,
  tabs
}: paramsTabs) => {
  const pathname = usePathname()

  return <div className={styles.tabs}>
    <ul className={styles.tabs_nav}>
      {
        tabs.map((item, idx) => {
          return <li key={item[idx]}>
            <a href={hrefs[idx]} className={pathname === `${hrefs[idx]}` ? styles.active : ""}>{titles[idx]}</a>
          </li>
        })
      }
    </ul>
  </div>
}

export default Tabs
