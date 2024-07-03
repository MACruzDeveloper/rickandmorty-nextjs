import Image from "next/image"
import styles from "./footer.module.css"

const Footer = () => {

  return <footer className={styles.footer}>
    <div className="container">
      <div className={`flex ${styles.flex}`}>
        <Image
          src="/react.svg"
          className={styles.logo}
          width={110}
          height={32}
          alt="React"
        />

        <Image
          src="/next.svg"
          className={styles.logo}
          width={120}
          height={24}
          alt="NextJs"
        />

        <Image
          src="/typescript.svg"
          className={styles.logo}
          width={120}
          height={30}
          alt="Typescript"
        />
      </div>
    </div>
  </footer>
}

export default Footer