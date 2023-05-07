import { FC } from "react";
import { IVacancy } from "@/types";
import { useRouter } from "next/router";
import styles from "../styles/vacancy.module.scss";

interface IVacancyProps {
  loading?: boolean;
  vacancy: IVacancy;
  classNames?: {
    container?: string;
    title?: string;
    text?: string;
  };
}

const Vacancy: FC<IVacancyProps> = ({ loading = false, vacancy, classNames = {} }) => {
  const salary = getSalary();
  const router = useRouter();

  function getSalary() {
    if (vacancy) {
      if (!vacancy.payment_from && !vacancy.payment_to) {
        return "Зарплата не указана";
      }

      if (vacancy.payment_from && vacancy.payment_to) {
        return `з/п ${vacancy.payment_from} - ${vacancy.payment_to} ${vacancy.currency}`;
      }

      if (vacancy.payment_from && !vacancy.payment_to) {
        return `з/п от ${vacancy.payment_from} ${vacancy.currency}`;
      }

      if (!vacancy.payment_from && vacancy.payment_to) {
        return `з/п до ${vacancy.payment_to} ${vacancy.currency}`;
      }
    }
  }

  function vacancyOnClick() {
    router.push(`/vacancies/${vacancy!.id}`);
  }

  if (loading) {
    return <div className={`${styles.vacancy} ${styles.loading}`}></div>;
  }

  return (
    <article className={`${styles.vacancy} ${classNames.container}`} onClick={vacancyOnClick}>
      <div className={`${styles.vacancy__title} ${styles.title} `}>
        <h2 className={`${styles.title__text} ${classNames.title}`}>
          <span>{vacancy.profession}</span>
        </h2>
        <div className={styles.title__icon}>
          <svg width='22' height='22' viewBox='0 0 256 256'>
            <path d='M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z'></path>
          </svg>
        </div>
      </div>
      <div className={`${styles.vacancy__description}`}>
        <div className={`${styles.vacancy__condition} ${styles.salary} ${classNames.text}`}>{salary}</div>
        <div className={`${styles.vacancy__condition} ${classNames.text}`}>{vacancy.type_of_work.title}</div>
      </div>
      <div className={styles.vacancy__location}>
        <span>{vacancy.town.title}</span>
      </div>
    </article>
  );
};

export default Vacancy;
