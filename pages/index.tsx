import { getAuthorization, getCatalog, getVacancies, setRefreshToken } from "@/helpers/fetchers";
import { IVacanciesResponse } from "@/types";
import { useDispatchTyped } from "@/hooks/redux";
import { FC, useEffect } from "react";
import { setFavorites } from "@/store/slices/vacancies-slice";
import { setCatalog } from "@/store/slices/filter-slice";
import { ICategory } from "@/types";
import VacanciesBar from "@/components/vacancies-bar";
import FiltersMenu from "@/components/filters-menu";
import FiltersBar from "@/components/filters-bar";
import Head from "next/head";
import styles from "@/styles/main.module.scss";

export async function getStaticProps() {
  const tokens = await getAuthorization() || "";
  const vacancies = await getVacancies({}) || [];
  const categories = await getCatalog() || [];

  return {
    props: { tokens, vacancies, categories },
  };
}

interface MainPageProps {
  vacancies: IVacanciesResponse;
  categories: ICategory[];
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

const MainPage: FC<MainPageProps> = ({ vacancies, categories, tokens }) => {
  const vacanciesList = Array.from(vacancies.objects) || [];
  const dispatch = useDispatchTyped();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")!) || [];
    dispatch(setFavorites(Object.values(favorites)));
    dispatch(setCatalog(categories));

    if (tokens) {
      localStorage.setItem("access", tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
    }
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
            <VacanciesBar vacancies={Array.from(vacanciesList)} />
            <FiltersMenu />
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
