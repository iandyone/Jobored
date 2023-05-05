import { useSelectorTyped } from "@/hooks/redux";
import { vacanciesApi } from "@/store/api/vacancies-api";
import { useRouter } from "next/router";
import { FC } from "react";
import Vacancy from "@/components/vacancy";
import styles from "../../styles/vacancy-page.module.scss";
import parse from "html-react-parser";

const VacansyPage: FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const { current: vacancies } = useSelectorTyped((store) => store.vacancies);
  const { isLoading, data } = vacanciesApi.useFetchVacancyQuery(String(id!));
  const { vacancyData, description, loading } = getVacancyData();

  const vacancyCardClasses = {
    container: styles.vacancy__card,
    title: styles.vacancy__title,
    text: styles.vacancy__text,
  };

  function getVacancyData() {
    const vacancyData = vacancies.find((vacancy) => vacancy.id === +id!) || data;
    const loading = vacancyData ? false : isLoading;
    const description = parse(vacancyData ? vacancyData!.vacancyRichText : "");
    return { vacancyData, loading, description };
  }

  return (
    <>
      <div className={styles.vacancy}>
        <div className={`${styles.vacancy__container} container`}>
          <Vacancy loading={loading} vacancy={vacancyData!} classNames={vacancyCardClasses} />
          <div className={`${styles.vacancy__description} ${loading && styles.loading}`}>{description}</div>
        </div>
      </div>
    </>
  );
};

export default VacansyPage;
