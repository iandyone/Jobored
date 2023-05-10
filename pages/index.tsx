import { FC, useEffect } from "react";
import { ICategory } from "@/types";
import { useDispatchTyped } from "@/hooks/redux";
import { getAuthorization, getCatalog, getVacancies } from "@/helpers/fetchers";
import { setCatalog } from "@/store/slices/filter-slice";
import { VacanciesResponse } from "@/types";
import { setFavorites } from "@/store/slices/vacancies-slice";
import Head from "next/head";
import styles from "@/styles/main.module.scss";
import FiltersBar from "@/components/filters-bar";
import VacanciesBar from "@/components/vacancies-bar";

export async function getStaticProps() {
  const tokens = (await getAuthorization()) || "";
  const vacancies = (await getVacancies({})) || [];
  const categories = (await getCatalog()) || [];

  return {
    props: { tokens, vacancies, categories },
  };
}

interface MainPageProps {
  vacancies: VacanciesResponse;
  categories: ICategory[];
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

const MainPage: FC<MainPageProps> = ({ tokens, vacancies, categories }) => {
  const dispatch = useDispatchTyped();

  useEffect(() => {
    dispatch(setCatalog(categories));
    
    if (tokens) {
      localStorage.setItem("access", tokens.accessToken);
      localStorage.setItem("refresh", tokens.refreshToken);
    }
    const favorites = JSON.parse(localStorage.getItem("favorites")!) || [];
    dispatch(setFavorites(Object.values(favorites)));
  }, []);

  return (
    <>
      <Head>
        <title>Jobored</title>
      </Head>
      <main className={styles.jobs}>
        <div className={`${styles.jobs__container} container`}>
          <div className={styles.jobs__body}>
            <FiltersBar />
            <VacanciesBar vacancies={Array.from(vacancies.objects)} />
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
