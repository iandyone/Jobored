import { FC } from "react";
import styles from "../styles/burger-menu.module.scss";

interface BurgerMenuProps {
  className: string;
  isOpen: boolean;
  handlerOnClick: (e:any) => void;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ className, isOpen, handlerOnClick }) => {
  return (
    <div className={`${className} ${styles.burger} ${isOpen && styles.active}`} onClick={handlerOnClick}>
      <span className={`${styles.burger__item}  ${isOpen && styles.active}`}></span>
    </div>
  );
};

export default BurgerMenu;
