import { FC, useEffect, useState } from "react";
import { IVacancy, handlerPageChangeProps } from "@/types";
import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { setFavorites } from "@/store/slices/vacancies-slice";
import VacanciesList from "@/components/vacancies-list";
import EmptyState from "@/components/empty-state";
import Heading from "@/components/heading";
import FavoritesLayout from "@/components/layouts/favorites-layout";
import styles from "../../styles/favorites.module.scss";

const Favorites: FC = () => {
  const vacanciesPerPage = +process.env.NEXT_PUBLIC_VACANCIES_PER_PAGE!;
  const { favorites } = useSelectorTyped((store) => store.vacancies);
  const [vacancies, setVacancies] = useState(getVacancies(1));
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(countPages());
  const dispatch = useDispatchTyped();

  function countPages(vacs: IVacancy[] = []) {
    const vacancies = vacs.length ? vacs : Object.values(favorites) || JSON.parse(localStorage.getItem("favorites")!);
    return Math.ceil(vacancies.length / vacanciesPerPage);
  }

  function getVacancies(page: number) {
    const vacancies = Object.values(favorites);
    const firstIndex = (page - 1) * vacanciesPerPage;
    return vacancies.slice(firstIndex, firstIndex + vacanciesPerPage);
  }

  function handlerPageChange({ selected }: handlerPageChangeProps) {
    setCurrentPage(selected + 1);
    setVacancies(getVacancies(selected + 1));
  }

  function getFavorites() {
    if (!Object.values(favorites).length) {
      const savedVacancies = localStorage.getItem("favorites");

      if (savedVacancies) {
        const vacancies: IVacancy[] = Object.values(JSON.parse(savedVacancies));
        const startVacancies = vacancies.slice(0, vacanciesPerPage);
        setVacancies(startVacancies);
        setPages(countPages(vacancies));
        dispatch(setFavorites(vacancies));
      }
    }
  }

  useEffect(() => {
    getVacancies(currentPage);
    getFavorites();
  }, []);

  if (!vacancies.length) {
    return (
      <FavoritesLayout>
        <EmptyState>
          <Heading text='Упс, здесь еще ничего нет!' tag='h2' className={styles.favorites__title} />
        </EmptyState>
      </FavoritesLayout>
    );
  }

  return (
    <FavoritesLayout>
      <VacanciesList currentPage={currentPage} handlerPageChange={handlerPageChange} pages={pages} vacancies={vacancies} />
    </FavoritesLayout>
  );
};

export default Favorites;
