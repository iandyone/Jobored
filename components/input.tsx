import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { setMaxSalaryValue, setMinSalaryValue } from "@/store/slices/filter-slice";
import styles from "../styles/input.module.scss";

interface InputProps {
  type: "text" | "number";
  placeholder?: string;
  salaryType: `min` | "max";
}

const Input: FC<InputProps> = ({ type, placeholder, salaryType }) => {
  const [value, setValue] = useState<string | number>("");
  const { from: minSalary, to: maxSalary } = useSelectorTyped((store) => store.filters);
  const dispatch = useDispatchTyped();

  function handlerOnChange(e: ChangeEvent<HTMLInputElement>) {
    const checkDigits = /^[0-9]*$/;
    const value = e.target.value;

    if (!value) {
      setValue("");
      salaryType === "min" ? dispatch(setMinSalaryValue("")) : dispatch(setMaxSalaryValue(""));
      return;
    }

    if (checkDigits.test(value)) {
      setValue(+e.target.value);
      salaryType === "min" ? dispatch(setMinSalaryValue(+value!)) : dispatch(setMaxSalaryValue(+value!));
      return;
    }
  }

  function changeValue(e: MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLElement;

    if (target.classList.contains(`${styles.increase}`)) {
      setValue(+value + 1);
      salaryType === "min" ? dispatch(setMinSalaryValue(+value! + 1)) : dispatch(setMaxSalaryValue(+value! + 1));
      return;
    }

    if (target.classList.contains(`${styles.reduce}`) && +value) {
      setValue(+value - 1);
      salaryType === "min" ? dispatch(setMinSalaryValue(+value! - 1)) : dispatch(setMaxSalaryValue(+value! - 1));
      return;
    }
  }
  
  return (
    <div className={styles.input}>
      <input className={styles.input__element} type={type} placeholder={placeholder} onChange={handlerOnChange} value={salaryType === "min" ? minSalary : maxSalary} />
      <button className={`${styles.input__button} ${styles.increase}`} onClick={changeValue}></button>
      <button className={`${styles.input__button} ${styles.reduce}`} onClick={changeValue}></button>
    </div>
  );
};

export default Input;
