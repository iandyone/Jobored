import { FC } from "react";
import { useRouter } from "next/router";
import styles from "../styles/navigation.module.scss";
import Link from "next/link";

const navigation = [
  { id: 1, title: "Поиск Вакансий", path: "/", className: styles.navigation__link },
  { id: 2, title: "Избранное", path: "/favorites", className: styles.navigation__link },
];

const Navbar: FC = () => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__links}>
        {navigation.map(({ id ,title, path, className }) => {
          return (
            <li key={id} className={path === pathname ? `${className} ${styles.active}` : className}>
              <Link href={path}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
