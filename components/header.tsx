import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { setBurgerMenuVisibility } from "@/store/slices/menu-slice";
import { FC, MouseEvent } from "react";
import styles from "../styles/header.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.svg";
import NavBar from "./navbar";
import BurgerMenu from "./burger-menu";

const Header: FC = () => {
  const dispatch = useDispatchTyped();
  const { burger } = useSelectorTyped((store) => store.menu);

  function handlerBurgerOnCLick(e: MouseEvent<HTMLElement>) {
    dispatch(setBurgerMenuVisibility(!burger));
    e.stopPropagation();
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__container + " container"}>
        <div className={styles.header__body}>
          <div className={styles.header__logo}>
            <Link href='/'>
              <Image alt='logo.svg' src={logo} priority />
            </Link>
          </div>
          <NavBar className={`${styles.header__navigation} ${burger && styles.active}`} />
          <BurgerMenu className={styles.header__burger} isOpen={burger} handlerOnClick={e => handlerBurgerOnCLick(e)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
