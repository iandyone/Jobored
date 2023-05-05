import { FC } from "react";
import { useRouter } from "next/router";
import styles from "../styles/navigation.module.scss";
import Link from "next/link";

const Navbar: FC = () => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__links}>
        <li className={!pathname.includes("favorites") ? `${styles.navigation__link} ${styles.active}` : styles.navigation__link}>
          <Link href='/'>Поиск Вакансий</Link>
        </li>
        <li className={pathname.includes("favorites") ? `${styles.navigation__link} ${styles.active}` : styles.navigation__link}>
          <Link href='/favorites'>Избранное</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
