import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { ChangeEvent, FC } from "react";
import { setTitle } from "@/store/slices/filter-slice";
import Button from "./button";
import styles from "../styles/search-input.module.scss";

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput: FC<SearchInputProps> = ({ placeholder }) => {
  const { title } = useSelectorTyped((store) => store.filters);
  const dispatch = useDispatchTyped();

  function inputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setTitle(e.target.value));
  }

  return (
    <div className={styles.search}>
      <input className={styles.search__input} type='text' placeholder={placeholder} value={title} onChange={inputChangeHandler} data-elem='search-input' />
      <Button className={styles.search__button} text='Поиск' />
    </div>
  );
};

export default SearchInput;
