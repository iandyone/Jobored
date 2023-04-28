import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { MouseEvent, FC, useState } from "react";
import { setCategory } from "@/store/slices/filter-slice";
import styles from "../styles/select.module.scss";
import Image from "next/image";
import arrow from "../public/filters-bar/arrow.svg";
import arrowActive from "../public/filters-bar/arrow-active.svg";

interface ISelect {
  className: string;
}

const Select: FC<ISelect> = ({ className }) => {
  const [selectActivity, setSelectActivity] = useState(false);
  const [menuVisability, setMenuVisability] = useState(false);
  const { category: selectValue, categories } = useSelectorTyped((store) => store.filters);
  const selectClassName = selectActivity ? `${className} ${styles.select} ${styles.active}` : `${className} ${styles.select}`;
  const dispatch = useDispatchTyped();
   
  function selectOnClick(e: MouseEvent<HTMLDivElement>) {
    setMenuVisability(!menuVisability);
  }

  function optionOnClick(e: MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    const element = target.closest("li");
    const category = element!.getAttribute("data-value");
    dispatch(setCategory(category!));
    setSelectActivity(true);
    setMenuVisability(false);
  }
  
  return (
    <div className={selectClassName} onClick={selectOnClick}>
      <span>{selectValue || 'Выберите отрасль'}</span>
      <div className={styles.select__icon}>
        <Image src={menuVisability ? arrowActive : arrow} alt='x-mark icon' />
      </div>
      <ul className={menuVisability ? `${styles.select__menu} + ${styles.active}` : styles.select__menu}>
        {categories && categories.map(({ id, title }) => {
          return (
            <li className={styles.select__option} data-value={title} onClick={optionOnClick} key={id}>
              <span>{title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;