import { LayoutProps } from "@/types";
import { FC } from "react";
import SearchInput from "../search-input";
import styles from "../../styles/vacancies.module.scss";

const VacanciesLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <section className={styles.vacancies}>
      <SearchInput placeholder='Введите название вакансии' />
      {children}
    </section>
  );
};

export default VacanciesLayout;
