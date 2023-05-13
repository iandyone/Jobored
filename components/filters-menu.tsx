import { setBurgerMenuVisibility, setFiltersMenuVisibility } from "@/store/slices/menu-slice";
import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { FC, MouseEvent } from "react";
import FiltersBar from "./filters-bar";
import styles from "../styles/filters-menu.module.scss";

const FiltersMenu: FC = () => {
  const { filters: isMenuActive } = useSelectorTyped((store) => store.menu);
  const dispatch = useDispatchTyped();

  function openFiltersMenu(e: MouseEvent<HTMLElement>) {
    dispatch(setBurgerMenuVisibility(false));
    dispatch(setFiltersMenuVisibility(true));
    handlerOnCLick(e);
  }

  function handlerOnCLick(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
  }

  return (
    <aside className={styles.menu} onClick={handlerOnCLick}>
      <div className={`${styles.menu__body} ${isMenuActive && styles.active}`}>
        <FiltersBar className={styles.menu__filters} />
      </div>
      <button className={styles.menu__button} onClick={openFiltersMenu}>
        <svg width='24' height='24' viewBox='0 0 256 256'>
          <path d='M136,120v96a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm64,72a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V200A8,8,0,0,0,200,192Zm24-32H208V40a8,8,0,0,0-16,0V160H176a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16ZM56,160a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V168A8,8,0,0,0,56,160Zm24-32H64V40a8,8,0,0,0-16,0v88H32a8,8,0,0,0,0,16H80a8,8,0,0,0,0-16Zm72-48H136V40a8,8,0,0,0-16,0V80H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z'></path>
        </svg>
        <span className={styles.menu__text}>Фильтры</span>
      </button>
    </aside>
  );
};

export default FiltersMenu;
