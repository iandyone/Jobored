import { FC, MouseEvent, useEffect, useState } from "react";
import { setFiltersMenuVisibility } from "@/store/slices/menu-slice";
import { IFavorite, IVacancy } from "@/types";
import { useDispatchTyped } from "@/hooks/redux";
import { setFavorites } from "@/store/slices/vacancies-slice";
import { useRouter } from "next/router";
import styles from "../styles/vacancy.module.scss";

interface IVacancyProps {
  vacancy: IVacancy;
  loading?: boolean;
  classNames?: {
    container?: string;
    title?: string;
    text?: string;
  };
}

const Vacancy: FC<IVacancyProps> = ({ vacancy, loading = false, classNames = {} }) => {
  const [isSaved, setSaved] = useState(false);
  const dispatch = useDispatchTyped();
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

  function saveVacancy(event: MouseEvent<HTMLElement>) {
    const favorites: IFavorite = JSON.parse(localStorage.getItem("favorites")!) || ({} as IFavorite);
    const isVacancyAlredySaved = vacancy.id in favorites;
    dispatch(setFiltersMenuVisibility(false));

    if (isVacancyAlredySaved) {
      delete favorites[vacancy.id];
      setSaved(false);
    } else {
      favorites[vacancy.id] = vacancy;
      setSaved(true);
    }

    dispatch(setFavorites(Object.values(favorites)));
    localStorage.setItem("favorites", JSON.stringify(favorites));
    event.stopPropagation();
  }

  function checkSaved() {
    const favorites: IFavorite = JSON.parse(localStorage.getItem("favorites")!) || ({} as IFavorite);
    const isSaved = vacancy?.id in favorites;
    setSaved(isSaved);
  }

  useEffect(() => {
    checkSaved();
  });

  if (loading) {
    return <div className={`${styles.vacancy} ${styles.loading}`}></div>;
  }

  return (
    <article className={`${styles.vacancy} ${classNames.container}`} onClick={vacancyOnClick} data-elem={`vacancy-${vacancy.id}`}>
      <div className={`${styles.vacancy__title} ${styles.title} `}>
        <h2 className={`${styles.title__text} ${classNames.title}`}>
          <span>{vacancy.profession}</span>
        </h2>
        <div className={`${styles.title__icon} ${isSaved && styles.active}`} onClick={saveVacancy} data-elem={`vacancy-${vacancy.id}-shortlist-button`}>
          <svg width='24' height='24' viewBox='0 0 24 24'>
            <path
              d='M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z'
              strokeWidth='1.5'
            />
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
