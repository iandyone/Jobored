import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import FiltersBar from "@/components/filters-bar";
import VacanciesBar from "@/components/vacancies-bar";
import { FC, useEffect } from "react";
import { ICategory, IVacancy } from "@/types";
import { useDispatchTyped } from "@/hooks/redux";
import { getAuthorization, getCatalog, getVacancies } from "@/helpers/fetchers";
import { setCatalog } from "@/store/slices/filter-slice";

export async function getStaticProps() {
  const accessToken = await getAuthorization() || "";
  const vacancies = await getVacancies({ accessToken }) || [];
  const categories = await getCatalog({ accessToken }) || [];

  return {
    props: { accessToken, vacancies, categories },
  };
}

interface HomeProps {
  accessToken: string;
  vacancies: IVacancy[];
  categories: ICategory[];
}

const Home: FC<HomeProps> = ({ accessToken, vacancies, categories }) => {
  const dispatch = useDispatchTyped();

  useEffect(() => {
    localStorage.setItem("access", accessToken);
    dispatch(setCatalog(categories));
    console.log(vacancies);
    
    // TODO: dispatch vacancies action
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
            <VacanciesBar />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
