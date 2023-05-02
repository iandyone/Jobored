import { ChangeEvent, FC } from "react";
import styles from "../styles/search-input.module.scss";
import Button from "./button";
import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { setTitle } from "@/store/slices/filter-slice";

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput: FC<SearchInputProps> = ({ placeholder }) => {
  const { title } = useSelectorTyped((store) => store.filters);
  const dispatch = useDispatchTyped();

  function inputInChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setTitle(e.target.value));
  }

  return (
    <div className={styles.search}>
      <input className={styles.search__input} type='text' placeholder={placeholder} value={title} onChange={inputInChange} />
      <Button className={styles.search__button} text='Поиск' />
    </div>
  );
};

export default SearchInput;
