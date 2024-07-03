import Image from "next/image"
import styles from "./header.module.css"
import Navigation from "../Navigation/Navigation"
import logo from '../../../public/images/logo.svg'

const Header = () => {

  return <header className={styles.header}>
    <div className="container">
      <div className={`flex ${styles.flex}`}>
        <Image src={logo} className={styles.logo} alt="HBOmax" />

        <Navigation />
      </div>
    </div>
  </header>
}

export default Header