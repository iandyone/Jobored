import { FC, useEffect } from "react";
import { ICategory, IVacancy } from "@/types";
import { useDispatchTyped } from "@/hooks/redux";
import { getAuthorization, getCatalog, getVacancies } from "@/helpers/fetchers";
import { setCatalog } from "@/store/slices/filter-slice";
import { VacanciesResponse } from "@/types";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import FiltersBar from "@/components/filters-bar";
import VacanciesBar from "@/components/vacancies-bar";

export async function getStaticProps() {
  const tokens = await getAuthorization() || "";
  const vacancies = await getVacancies({}) || [];
  const categories = await getCatalog() || [];

  return {
    props: { tokens, vacancies, categories },
  };
}

interface HomeProps {
  vacancies: VacanciesResponse;
  categories: ICategory[];
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

const Home: FC<HomeProps> = ({ tokens, vacancies, categories }) => {
  const dispatch = useDispatchTyped();

  useEffect(() => {
    dispatch(setCatalog(categories));
    if (tokens) {
      localStorage.setItem("access", tokens.accessToken);
      localStorage.setItem("refresh", tokens.refreshToken);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Jobored | Main</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
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

export default Home;
