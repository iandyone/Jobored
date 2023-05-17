import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { setBurgerMenuVisibility, setFiltersMenuVisibility } from "@/store/slices/menu-slice";
import { FC, MouseEvent } from "react";
import styles from "../styles/filters-bar-menu-button.module.scss";

const FiltersMenuButton: FC = () => {
  const { filters } = useSelectorTyped((store) => store.menu);
  const dispatch = useDispatchTyped();

  function openFiltersMenu(e: MouseEvent<HTMLElement>) {
    dispatch(setBurgerMenuVisibility(false));
    dispatch(setFiltersMenuVisibility(!filters));
    e.stopPropagation();
  }

  return (
    <button className={styles.menu__button} onClick={openFiltersMenu}>
      <svg width='26' height='26' viewBox='0 0 256 256'>
        <path d='M136,120v96a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm64,72a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V200A8,8,0,0,0,200,192Zm24-32H208V40a8,8,0,0,0-16,0V160H176a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16ZM56,160a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V168A8,8,0,0,0,56,160Zm24-32H64V40a8,8,0,0,0-16,0v88H32a8,8,0,0,0,0,16H80a8,8,0,0,0,0-16Zm72-48H136V40a8,8,0,0,0-16,0V80H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z'></path>
      </svg>
      <span className={styles.menu__text}>Фильтры</span>
    </button>
  );
};

export default FiltersMenuButton;
