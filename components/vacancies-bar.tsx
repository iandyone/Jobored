import { FC, useEffect, useState } from "react";
import { vacanciesApi } from "@/store/api/vacancies-api";
import { IVacancy } from "@/types";
import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { setPage, setVacancies } from "@/store/slices/vacancies-slice";
import styles from "../styles/vacancies.module.scss";
import Vacancy from "./vacancy";
import ReactPaginate from "react-paginate";
import EmptyState from "./empty-state";
import Heading from "./heading";
import VacanciesLayout from "./layouts/vacancies-layout";

interface handlerPageChangeProps {
  selected: number;
}

interface VacanciesBarProps {
  vacancies: IVacancy[];
}

const VacanciesBar: FC<VacanciesBarProps> = ({ vacancies: startVacancies }) => {
  const { page: currentPage } = useSelectorTyped((store) => store.vacancies);
  const { activeFilters } = useSelectorTyped((state) => state.filters);
  const dispatch = useDispatchTyped();
  const vacanciesConfig = getVacanciesRequestConfig();
  const skipFetchCondition = !Object.keys(activeFilters).length && currentPage === 1;

  const { isFetching, isLoading, data } = vacanciesApi.useFetchVacanciesQuery(vacanciesConfig, { skip: skipFetchCondition });
  const loading = isFetching || isLoading;
  const [pages, setPages] = useState(getPageCounter());
  const vacancies = getVacancies();

  function getVacancies() {
    if (skipFetchCondition) {
      dispatch(setVacancies(startVacancies));
      return startVacancies;
    }

    const vacancies = data ? data.objects : startVacancies;
    dispatch(setVacancies(vacancies));

    return vacancies;
  }

  function getPageCounter() {
    const vacanciesPerPage = process.env.NEXT_PUBLIC_VACANCIES_PER_PAGE;
    const vavanciesPerRequest = process.env.NEXT_PUBLIC_VACANCIES_PER_REQUEST;
    const maxPages = +vavanciesPerRequest! / +vacanciesPerPage!;

    if (data) {
      const lastPage = Math.ceil(data.total / +vacanciesPerPage!) - 1;
      return lastPage < maxPages ? lastPage : maxPages;
    }

    return maxPages;
  }

  function handlerPageChange({ selected }: handlerPageChangeProps) {
    dispatch(setPage(selected + 1));
  }

  function getVacanciesRequestConfig() {
    return {
      page: currentPage,
      no_agreement: 1,
      count: process.env.NEXT_PUBLIC_VACANCIES_PER_PAGE,
      ...activeFilters,
    };
  }

  useEffect(() => {
    setPages(getPageCounter());
  });

  if (data && !data.objects.length && loading) {
    const vacancies = startVacancies;

    return (
      <VacanciesLayout>
        <div className={styles.vacancies__list}>
          {vacancies.map((vacancy) => {
            return <Vacancy vacancy={vacancy} key={vacancy.id} loading={loading} />;
          })}
        </div>
      </VacanciesLayout>
    );
  }

  if (data && !data.objects.length) {
    return (
      <VacanciesLayout>
        <EmptyState>
          <Heading className={styles.vacancies__heading} text='Вакансий не найдено' tag='h2' />
        </EmptyState>
      </VacanciesLayout>
    );
  }

  return (
    <VacanciesLayout>
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
          forcePage={currentPage - 1}
        />
      </div>
    </VacanciesLayout>
  );
};

export default VacanciesBar;
