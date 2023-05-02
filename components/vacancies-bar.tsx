import { FC, useEffect, useState } from "react";
import styles from "../styles/vacancies.module.scss";
import ReactPaginate from "react-paginate";
import SearchInput from "./search-input";
import { vacanciesApi } from "@/store/api/vacancies-api";

const VacanciesBar: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
 
  const { isError, isFetching, isLoading, isSuccess, data:vacancies } = vacanciesApi.useFetchVacanciesQuery(currentPage);


  useEffect(() => {
    console.log(vacancies);
  })


  return (
    <section className={styles.vacancies}>
      <SearchInput placeholder='Введите название вакансии' />
      <div className={styles.vacancies__list}></div>
      <div className={styles.vacancies__paginge}>
        <ReactPaginate breakLabel='...' nextLabel='next >' onPageChange={() => {}} pageRangeDisplayed={5} pageCount={10} previousLabel='< previous' renderOnZeroPageCount={null} />
      </div>

      <button onClick={() => setCurrentPage(currentPage + 1)}>К Н О П К А </button>
      <div>
        {isFetching && <h1>LOADING...</h1>}

        {vacancies && !isFetching && Array.from(vacancies.objects).map((vacancy) => {
            return <div key={vacancy.id}>{vacancy.profession}</div>;
          })}
      </div>
    </section>
  );
};

export default VacanciesBar;
