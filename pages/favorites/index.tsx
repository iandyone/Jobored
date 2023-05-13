import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { IVacancy, handlerPageChangeProps } from "@/types";
import { FC, useEffect, useState } from "react";
import { setFavorites } from "@/store/slices/vacancies-slice";
import { useRouter } from "next/router";
import { scrollTop } from "@/helpers/animations";
import FavoritesLayout from "@/components/layouts/favorites-layout";
import VacanciesList from "@/components/vacancies-list";
import EmptyState from "@/components/empty-state";
import Heading from "@/components/heading";
import Button from "@/components/button";
import styles from "../../styles/favorites.module.scss";

const Favorites: FC = () => {
  const vacanciesPerPage = +process.env.NEXT_PUBLIC_VACANCIES_PER_PAGE!;
  const { favorites } = useSelectorTyped((store) => store.vacancies);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(countPages());
  const [vacancies, setVacancies] = useState(getVacancies(1));
  const dispatch = useDispatchTyped();
  const router = useRouter();

  function countPages(vacs: IVacancy[] = []) {
    const vacancies = vacs.length ? vacs : Object.values(favorites) || JSON.parse(localStorage.getItem("favorites")!);
    return Math.ceil(vacancies.length / vacanciesPerPage);
  }

  function getVacancies(page: number) {
    const vacancies = Object.values(favorites).reverse() || [];
    const firstIndex = (page - 1) * vacanciesPerPage;
    return vacancies.slice(firstIndex, firstIndex + vacanciesPerPage);
  }

  function handlerPageChange({ selected }: handlerPageChangeProps) {
    setCurrentPage(selected + 1);
    setVacancies(getVacancies(selected + 1));
    scrollTop()
  }

  function getFavorites() {
    if (!Object.values(favorites).length) {
      const savedVacancies = localStorage.getItem("favorites");

      if (savedVacancies) {
        const vacancies: IVacancy[] = Object.values(JSON.parse(savedVacancies)) || [];
        const startVacancies = vacancies.slice(0, vacanciesPerPage);
        setVacancies(startVacancies);
        setPages(countPages(vacancies));
        dispatch(setFavorites(vacancies));
      }
    }
  }

  function handlerEmptyButtonOnClick() {
    router.push("/");
  }

  useEffect(() => {
    getVacancies(currentPage);
    getFavorites();
  }, []);

  useEffect(() => {
    const vacancies = Object.values(favorites) || [];
    setPages(countPages(vacancies));
    setVacancies(getVacancies(currentPage));
  }, [favorites]);

  useEffect(() => {
    if (currentPage !== 1 && currentPage !== pages) {
      setVacancies(getVacancies(currentPage - 1));
      getFavorites();
      setCurrentPage(currentPage - 1);
    }
  }, [pages]);

  if (!vacancies.length) {
    return (
      <FavoritesLayout className={styles.favorites__empty}>
        <EmptyState>
          <Heading className={styles.favorites__heading} text='Упс, здесь еще ничего нет!' tag='h2' />
          <Button text='Поиск вакансий' className={styles.favorites__button} onClick={handlerEmptyButtonOnClick} />
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
