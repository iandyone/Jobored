import { FC, ChangeEvent, MouseEvent } from "react";
import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { setMaxSalaryValue, setMinSalaryValue } from "@/store/slices/filter-slice";
import styles from "../styles/salary-input.module.scss";

interface SalaryInputProps {
  placeholder?: string;
  salaryType: `min` | "max";
}

const SalaryInput: FC<SalaryInputProps> = ({ placeholder, salaryType }) => {
  const { from: minSalary, to: maxSalary } = useSelectorTyped((store) => store.filters);
  const value = salaryType === "min" ? minSalary : maxSalary;
  const dispatch = useDispatchTyped();
  const dataElemAttribute = salaryType === "min" ? "salary-from-input" : "salary-to-input";

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
      salaryType === "min" ? dispatch(setMinSalaryValue(+value! + 500)) : dispatch(setMaxSalaryValue(+value! + 500));
      return;
    }

    if (target.classList.contains(`${styles.reduce}`) && +value) {
      salaryType === "min" ? dispatch(setMinSalaryValue(+value! - 500)) : dispatch(setMaxSalaryValue(+value! - 500));
      return;
    }
  }

  return (
    <div className={styles.input}>
      <input className={styles.input__element} type='text' placeholder={placeholder} onChange={handlerOnChange} value={salaryType === "min" ? minSalary : maxSalary} data-elem={dataElemAttribute} />
      <button className={`${styles.input__button} ${styles.increase}`} onClick={changeValue}></button>
      <button className={`${styles.input__button} ${styles.reduce}`} onClick={changeValue}></button>
    </div>
  );
};

export default SalaryInput;
