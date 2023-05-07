import { FC, ReactNode } from "react";
import styles from "../../styles/vacancies.module.scss";
import SearchInput from "../search-input";

interface VacanciesLayoutProps {
  children: ReactNode;
}

const VacanciesLayout: FC<VacanciesLayoutProps> = ({ children }) => {
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
