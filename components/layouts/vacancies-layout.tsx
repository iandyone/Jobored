import { FC } from "react";
import { LayoutProps } from "@/types";
import styles from "../../styles/vacancies.module.scss";
import SearchInput from "../search-input";

const VacanciesLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <section className={styles.vacancies}>
        <SearchInput placeholder='Введите название вакансии' />
        {children}
      </section>
    </>
  );
};

export default VacanciesLayout;
