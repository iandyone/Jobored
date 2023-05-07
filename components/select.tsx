import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { MouseEvent, FC, useState } from "react";
import { setCategory } from "@/store/slices/filter-slice";
import styles from "../styles/select.module.scss";

interface ISelect {
  className: string;
}

const Select: FC<ISelect> = ({ className }) => {
  const [menuVisability, setMenuVisability] = useState(false);
  const { category, categories } = useSelectorTyped((store) => store.filters);

  const selectClassName = category ? `${className} ${styles.select} ${styles.active}` : `${className} ${styles.select}`;
  const dispatch = useDispatchTyped();

  function optionOnClick(e: MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    const element = target.closest("li");
    const category = element!.getAttribute("data-value");

    dispatch(setCategory(category!));
    setMenuVisability(false);
  }

  return (
    <div className={`${selectClassName} ${menuVisability ? styles.selected : ""}`} onClick={() => setMenuVisability(!menuVisability)}>
      <span>{category || "Выберите отрасль"}</span>
      <div className={`${styles.select__icon} ${menuVisability ? styles.active : ""}`}>
        <div className={styles.select__svg}>
          <svg width='25' height='25' viewBox='0 0 256 256'>
            <path d='M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z'></path>
          </svg>
        </div>
      </div>
      <ul className={menuVisability ? `${styles.select__menu} + ${styles.active}` : styles.select__menu}>
        {categories.map(({ id, title }) => {
          return (
            <li className={styles.select__option} onClick={optionOnClick} data-value={title} data-elem='industry-select' key={id}>
              <span>{title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
