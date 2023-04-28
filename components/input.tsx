import { FC, ChangeEvent, MouseEvent } from "react";
import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { setMaxSalaryValue, setMinSalaryValue } from "@/store/slices/filter-slice";
import styles from "../styles/input.module.scss";

interface InputProps {
  placeholder?: string;
  salaryType: `min` | "max";
}

const Input: FC<InputProps> = ({ placeholder, salaryType }) => {
  const { from: minSalary, to: maxSalary } = useSelectorTyped((store) => store.filters);
  const value = salaryType === "min" ? minSalary : maxSalary;
  const dispatch = useDispatchTyped();

  function handlerOnChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^\d]/g, "");

    if (!value) {
      salaryType === "min" ? dispatch(setMinSalaryValue("")) : dispatch(setMaxSalaryValue(""));
      return;
    }

    salaryType === "min" ? dispatch(setMinSalaryValue(+value!)) : dispatch(setMaxSalaryValue(+value!));
    return;
  }

  function changeValue(e: MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLElement;

    if (target.classList.contains(`${styles.increase}`)) {
      salaryType === "min" ? dispatch(setMinSalaryValue(+value! + 1)) : dispatch(setMaxSalaryValue(+value! + 1));
      return;
    }

    if (target.classList.contains(`${styles.reduce}`) && +value) {
      salaryType === "min" ? dispatch(setMinSalaryValue(+value! - 1)) : dispatch(setMaxSalaryValue(+value! - 1));
      return;
    }
  }

  return (
    <div className={styles.input}>
      <input className={styles.input__element} type='text' placeholder={placeholder} onChange={handlerOnChange} value={salaryType === "min" ? minSalary : maxSalary} />
      <button className={`${styles.input__button} ${styles.increase}`} onClick={changeValue}></button>
      <button className={`${styles.input__button} ${styles.reduce}`} onClick={changeValue}></button>
    </div>
  );
};

export default Input;
