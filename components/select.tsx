import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { MouseEvent, FC } from "react";
import { setCategory } from "@/store/slices/filter-slice";
import { setCategoriesMenuVisibility } from "@/store/slices/menu-slice";
import styles from "../styles/select.module.scss";

interface ISelect {
  className: string;
}

const Select: FC<ISelect> = ({ className }) => {
  const { categories: menuVisability } = useSelectorTyped((store) => store.menu);
  const { category, categories } = useSelectorTyped((store) => store.filters);
  const selectClassName = `${styles.select} ${category.title && styles.active} ${menuVisability && styles.selected} ${className}`;
  const dispatch = useDispatchTyped();

  function optionOnClick(e: MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    const element = target.closest("li");
    const category = element!.getAttribute("data-value");
    const currentCategory = categories.find((categoryItem) => categoryItem.title === category);
    dispatch(setCategory(currentCategory!));
  }

  function setMenuVisibility(e: MouseEvent<HTMLElement>) {
    dispatch(setCategoriesMenuVisibility(!menuVisability));
    e.stopPropagation();
  }

  return (
    <div className={selectClassName} onClick={setMenuVisibility} data-elem='industry-select'>
      <span>{category.title || "Выберите отрасль"}</span>
      <div className={`${styles.select__icon} ${menuVisability && styles.active}`}>
        <div className={styles.select__svg}>
          <svg width='25' height='25' viewBox='0 0 256 256'>
            <path d='M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z'></path>
          </svg>
        </div>
      </div>
      <div className={styles.select__menu}>
        <ul className={`${styles.select__list} ${menuVisability && styles.active}`}>
          {categories.map(({ key, title }) => {
            return (
              <li className={styles.select__option} onClick={optionOnClick} data-value={title} data-elem='industry-select' key={key}>
                <span>{title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Select;
