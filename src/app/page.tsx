import Image from "next/image"
import styles from "./page.module.css"
import { preload } from '../data/getData'

export default function Home() {
  preload()

  return (
    <div className={styles.home}>
      <Image
        src="/images/edaf7517-1125-4b17-af05-219de97c4055.avif"
        alt="Rick and Morty"
        fill
      />

      <div className={styles.title}>
        <h1>Rick <span>&</span> <br />Morty</h1>
        <h2>Test</h2>
      </div>
    </div>
  )
}
