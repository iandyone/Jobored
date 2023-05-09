import { IVacancy, handlerPageChangeProps } from "@/types";
import { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from '../styles/vacancies-list.module.scss'
import Vacancy from "./vacancy";

interface VacanciesListProps {
  vacancies: IVacancy[];
  loading?: boolean;
  pages: number;
  currentPage: number;
  handlerPageChange: ({ selected }: handlerPageChangeProps) => void;
}

const VacanciesList: FC<VacanciesListProps> = ({ vacancies, loading, pages, currentPage, handlerPageChange }) => {
  return (
    <>
      <div className={styles.vacancies__list}>
        {vacancies.map((vacancy) => {
          return <Vacancy vacancy={vacancy} key={vacancy.id} loading={loading} />;
        })}
      </div>
      <div className={styles.vacancies__paginate}>
        <ReactPaginate
          breakLabel='...'
          nextLabel='>'
          onPageChange={handlerPageChange}
          pageRangeDisplayed={3}
          pageCount={pages}
          previousLabel='<'
          renderOnZeroPageCount={null}
          marginPagesDisplayed={1}
          containerClassName={styles.vacancies__pages}
          pageClassName={styles.vacancies__page}
          activeClassName={`${styles.vacancies__page} ${styles.active}`}
          previousClassName={styles.vacancies__page}
          nextClassName={styles.vacancies__page}
          disabledClassName={`${styles.vacancies__page} ${styles.disabled}`}
          breakClassName={styles.vacancies__break}
          breakLinkClassName={styles.vacancies__break}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default VacanciesList;
