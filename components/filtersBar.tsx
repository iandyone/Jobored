import { FC } from "react";
import styles from "../styles/filtersBar.module.scss";
import Select from "./select";
import Input from "./input";
import Heading from "./heading";
import Button from "./button";

const FiltersBar: FC = () => {
  return (
    <div className={styles.filters}>
      <div className={styles.filters__header}>
        <Heading className={styles.filters__title} tag="h2" text="Фильтры" />
        <div className={styles.filters__reset}>
          <span>Сбросить все</span>
          <div className={styles.filters__icon}>
            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <line x1="11.7425" y1="4.44219" x2="4.44197" y2="11.7427" stroke="#ACADB9" strokeWidth="1.25" />
              <line x1="11.9013" y1="11.7425" x2="4.60082" y2="4.44197" stroke="#ACADB9" strokeWidth="1.25" />
            </svg>
          </div>
        </div>
      </div>
      <article className={styles.industry}>
        <Heading className={styles.industry__title} tag="h3" text="Отрасль" />
        <Select className={styles.industry__select} />
      </article>
      <article className={styles.salary}>
        <Heading className={styles.salary__title} tag="h3" text="Оклад" />
        <Input type="number" placeholder="От" valueType="from" />
        <Input type="number" placeholder="До" valueType="to" />
      </article>
      <Button className={styles.filters__button} text="Применить" />
    </div>
  );
};

export default FiltersBar;
