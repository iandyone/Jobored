import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { IVacancy, handlerPageChangeProps } from "@/types";
import { FC, useEffect, useState } from "react";
import { setPage, setVacancies } from "@/store/slices/vacancies-slice";
import { vacanciesApi } from "@/store/api/vacancies-api";
import { scrollTop } from "@/helpers/animations";
import VacanciesLayout from "./layouts/vacancies-layout";
import VacanciesList from "./vacancies-list";
import EmptyState from "./empty-state";
import Heading from "./heading";
import styles from "../styles/vacancies.module.scss";

interface VacanciesBarProps {
  vacancies: IVacancy[];
}

const VacanciesBar: FC<VacanciesBarProps> = ({ vacancies: startVacancies }) => {
  const { page: currentPage } = useSelectorTyped((store) => store.vacancies);
  const { activeFilters } = useSelectorTyped((state) => state.filters);
  const dispatch = useDispatchTyped();
  const vacanciesRequestConfig = getVacanciesRequestConfig();
  const skipFetchCondition = !Object.keys(activeFilters).length && currentPage === 1;

  const { isFetching, isLoading, data } = vacanciesApi.useFetchVacanciesQuery(vacanciesRequestConfig, { skip: skipFetchCondition });
  const [pages, setPages] = useState(getPageCounter());
  const loading = isFetching || isLoading;
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
    const vavanciesPerRequest = process.env.NEXT_PUBLIC_VACANCIES_PER_REQUEST;
    const vacanciesPerPage = process.env.NEXT_PUBLIC_VACANCIES_PER_PAGE;
    const maxPages = +vavanciesPerRequest! / +vacanciesPerPage!;

    if (data) {
      const lastPage = Math.ceil(data.total / +vacanciesPerPage!) - 1;
      return lastPage < maxPages ? lastPage : maxPages;
    }

    return maxPages;
  }

  function handlerPageChange({ selected }: handlerPageChangeProps) {
    dispatch(setPage(selected + 1));
    scrollTop();
  }

  function getVacanciesRequestConfig() {
    return {
      count: +process.env.NEXT_PUBLIC_VACANCIES_PER_PAGE!,
      page: currentPage,
      no_agreement: 1,
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
        <VacanciesList currentPage={currentPage} handlerPageChange={handlerPageChange} pages={pages} vacancies={vacancies} loading={loading} />
      </VacanciesLayout>
    );
  }

  if (data && !data.objects.length) {
    return (
      <VacanciesLayout>
        <EmptyState>
          <Heading className={styles.vacancies__heading} text='Упс, здесь еще ничего нет!' tag='h2' />
        </EmptyState>
      </VacanciesLayout>
    );
  }

  return (
    <VacanciesLayout>
      <VacanciesList currentPage={currentPage} handlerPageChange={handlerPageChange} pages={pages} vacancies={vacancies} loading={loading} />
    </VacanciesLayout>
  );
};

export default VacanciesBar;
