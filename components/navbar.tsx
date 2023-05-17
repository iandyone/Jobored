import { useDispatchTyped } from "@/hooks/redux";
import { closeSidesMenu } from "@/store/slices/menu-slice";
import { FC, MouseEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/navigation.module.scss";

interface NavBarProps {
  className?: string;
}

const NavBar: FC<NavBarProps> = ({ className }) => {
  const { pathname } = useRouter();
  const dispatch = useDispatchTyped();

  function handlerOnClick(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  function handlerLinkOnClick() {
    dispatch(closeSidesMenu());
  }

  return (
    <nav className={`${styles.navigation} ${className}`} onClick={handlerOnClick}>
      <ul className={styles.navigation__links}>
        <li className={`${styles.navigation__link} ${!pathname.includes("favorites") && styles.active}`} onClick={handlerLinkOnClick}>
          <Link href='/'>Поиск Вакансий</Link>
        </li>
        <li className={`${styles.navigation__link} ${pathname.includes("favorites") && styles.active}`} onClick={handlerLinkOnClick}>
          <Link href='/favorites'>Избранное</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
