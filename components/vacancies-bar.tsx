import { FC, useState } from "react";
import { vacanciesApi } from "@/store/api/vacancies-api";
import styles from "../styles/vacancies.module.scss";
import ReactPaginate from "react-paginate";
import SearchInput from "./search-input";
import Vacancy from "./vacancy";
import { IVacancy } from "@/types";
import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { setPage, setVacancies } from "@/store/slices/vacancies-slice";

interface handlerPageChangeProps {
  selected: number;
}

interface VacanciesBarProps {
  vacancies: IVacancy[];
}

const VacanciesBar: FC<VacanciesBarProps> = ({ vacancies: startVacancies }) => {
  const { page: currentPage } = useSelectorTyped((store) => store.vacancies);
  const [pagesCounter, setPagesCount] = useState(125);
  const { isFetching, isLoading, data } = vacanciesApi.useFetchVacanciesQuery(currentPage, { skip: currentPage === 1 });
  const loading = isFetching || isLoading;
  const dispatch = useDispatchTyped();
  const vacancies = getVacansies();

  function getVacansies() {
    if (currentPage === 1) {
      dispatch(setVacancies(startVacancies));
      return startVacancies;
    }

    const vacancies = data ? data.objects : startVacancies;
    dispatch(setVacancies(vacancies));

    return vacancies;
  }

  function handlerPageChange({ selected }: handlerPageChangeProps) {
    dispatch(setPage(selected + 1));
  }

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
          forcePage={currentPage - 1}
        />
      </div>
    </section>
  );
};

export default VacanciesBar;
