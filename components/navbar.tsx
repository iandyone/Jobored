import { FC } from "react";
import { useRouter } from "next/router";
import styles from "../styles/navigation.module.scss";
import Link from "next/link";

const Navbar: FC = () => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__links}>
        <li className={`${styles.navigation__link} ${!pathname.includes("favorites") && styles.active}`}>
          <Link href='/'>Поиск Вакансий</Link>
        </li>
        <li className={`${styles.navigation__link} ${pathname.includes("favorites") && styles.active}`}>
          <Link href='/favorites'>Избранное</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
