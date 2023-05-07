import { FC } from "react";
import styles from "../styles/header.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.svg";
import NavBar from "./navbar";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container + ' container'}>
        <div className={styles.header__body}>
          <div className={styles.header__logo}>
            <Link href='/'>
              <Image alt='logo.svg' src={logo} priority />
            </Link>
          </div>
            <NavBar/>
        </div>
      </div>
    </header>
  );
};

export default Header;
