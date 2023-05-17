import { useSelectorTyped } from "@/hooks/redux";
import { FC, MouseEvent } from "react";
import FiltersBar from "./filters-bar";
import styles from "../styles/filters-menu.module.scss";

const FiltersMenu: FC = () => {
  const { filters: isMenuActive } = useSelectorTyped((store) => store.menu);

  function handlerOnCLick(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  return (
    <aside className={styles.menu} onClick={handlerOnCLick}>
      <div className={`${styles.menu__body} ${isMenuActive && styles.active}`}>
        <FiltersBar className={styles.menu__filters} />
      </div>
    </aside>
  );
};

export default FiltersMenu;
