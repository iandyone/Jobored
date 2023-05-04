import { FC, useEffect, useState } from "react";
import { vacanciesApi } from "@/store/api/vacancies-api";
import styles from "../styles/vacancies.module.scss";
import ReactPaginate from "react-paginate";
import SearchInput from "./search-input";
import Vacancy from "./vacancy";
import { IVacancy } from "@/types";

interface handlerPageChangeProps {
  selected: number;
}

interface VacanciesBarProps {
  vacancies: IVacancy[];
}

const VacanciesBar: FC<VacanciesBarProps> = ({ vacancies: startVacancies }) => {
  const [pagesCounter, setPagesCount] = useState(125);
  const [currentPage, setCurrentPage] = useState(1);
  const { isError, isFetching, isLoading, isSuccess, data } = vacanciesApi.useFetchVacanciesQuery(currentPage, { skip: currentPage === 1 });
  const vacancies = getVacansies();
  const loading = isFetching || isLoading;

  function getVacansies() {
    if (currentPage === 1) {
      return startVacancies;
    }

    return data ? data.objects : startVacancies;
  }

  function handlerPageChange({ selected }: handlerPageChangeProps) {
    setCurrentPage(selected + 1);
  }

  useEffect(() => {
    // console.log(vacancies);
  });

  return (
    <section className={styles.vacancies}>
      <SearchInput placeholder='Введите название вакансии' />
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
          pageCount={pagesCounter}
          previousLabel='<'
          renderOnZeroPageCount={null}
          marginPagesDisplayed={1}
          containerClassName={styles.vacancies__pages}
          pageClassName={styles.vacancies__page}
          activeClassName={`${styles.vacancies__page} ${styles.active}`}
          previousClassName={styles.vacancies__page}
          nextClassName={styles.vacancies__page}
          disabledClassName={`${styles.vacancies__page} ${styles.disabled}`}
        />
      </div>
    </section>
  );
};

export default VacanciesBar;
