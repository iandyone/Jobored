import { FC } from "react";
import { useDispatchTyped } from "@/hooks/redux";
import { resetFilters, setFilters } from "@/store/slices/filter-slice";
import { setPage } from "@/store/slices/vacancies-slice";
import styles from "../styles/filters-bar.module.scss";
import Select from "./select";
import SalaryInput from "./salary-input";
import Heading from "./heading";
import Button from "./button";

const FiltersBar: FC = () => {
  const dispatch = useDispatchTyped();
  
  function setDefaultFilters() {
    dispatch(resetFilters())
    dispatch(setFilters());
    dispatch(setPage(1));
  }

  return (
    <aside className={styles.filters}>
      <div className={styles.filters__header}>
        <Heading className={styles.filters__title} tag='h2' text='Фильтры' />
        <div className={styles.filters__reset} onClick={setDefaultFilters}>
          <span>Сбросить все</span>
          <div className={styles.filters__icon}>
            <svg width='16' height='16' viewBox='0 0 16 16'>
              <line x1='11.7425' y1='4.44219' x2='4.44197' y2='11.7427' stroke='#ACADB9' strokeWidth='1.25' />
              <line x1='11.9013' y1='11.7425' x2='4.60082' y2='4.44197' stroke='#ACADB9' strokeWidth='1.25' />
            </svg>
          </div>
        </div>
      </div>
      <article className={styles.industry}>
        <Heading className={styles.industry__title} tag='h3' text='Отрасль' />
        <Select className={styles.industry__select} />
      </article>
      <article className={styles.salary}>
        <Heading className={styles.salary__title} tag='h3' text='Оклад' />
        <SalaryInput placeholder='От' salaryType='min' />
        <SalaryInput placeholder='До' salaryType='max' />
      </article>
      <Button className={styles.filters__button} text='Применить' />
    </aside>
  );
};

export default FiltersBar;
