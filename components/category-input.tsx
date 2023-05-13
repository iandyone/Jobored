import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { FC, MouseEvent } from "react";
import { setCategory } from "@/store/slices/filter-slice";
import styles from "../styles/select.module.scss";

interface CategoryInputProps {
  category: string;
}

const CategoryInput: FC<CategoryInputProps> = ({ category }) => {
  const { categories } = useSelectorTyped((store) => store.filters);
  const dispatch = useDispatchTyped();

  function handlerOnClick(e: MouseEvent<HTMLInputElement>) {
    const currentCategory = categories.find((categoryItem) => categoryItem.title === category);
    dispatch(setCategory(currentCategory!));
    e.stopPropagation();
  }

  return (
    <>
      <label className={`${styles.select__option} ${styles.select__label}`} htmlFor={category}>
        {category}
      </label>
      <input className={`${styles.select__input}`} type='radio' name='category' id={category} value={category} onClick={handlerOnClick} />
    </>
  );
};

export default CategoryInput;
