import { MouseEvent, FC, useState, useEffect } from "react";
import styles from "../styles/select.module.scss";
import Image from "next/image";
import arrow from "../public/filters-bar/arrow.svg";
import arrowActive from "../public/filters-bar/arrow-active.svg";
import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { setCategory } from "@/store/slices/filter-slice";
import axios from "@/axios";
import { ICatalog } from "@/types";
import fetchCatalogAsync from "@/store/actions/filter-actions";

interface ISelect {
  className: string;
}

const Select: FC<ISelect> = ({ className }) => {
  const [selectActivity, setSelectActivity] = useState(false);
  const [menuVisability, setMenuVisability] = useState(false);
  const { category: selectValue, catalog } = useSelectorTyped((store) => store.filters);
  const dispatch = useDispatchTyped();

  const selectClassName = selectActivity ? `${className} ${styles.select} ${styles.active}` : `${className} ${styles.select}`;

  // const temp = catalog || []

  const categories = catalog.map(category => {
    return {id: category.key, title: category.title_trimmed}
  }) || [];
  



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

  useEffect(() => {
    // dispatch(fetchCatalogAsync())
  },[])

  return (
    <div className={selectClassName} onClick={selectOnClick}>
      <span>{selectValue || 'Выберите отрасль'}</span>
      <div className={styles.select__icon}>
        <Image src={menuVisability ? arrowActive : arrow} alt='x-mark icon' />
      </div>
      <ul className={menuVisability ? `${styles.select__menu} + ${styles.active}` : styles.select__menu}>
        {categories &&  categories.map(({ id, title }) => {
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
