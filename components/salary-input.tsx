import { ISalary, setMaxSalaryValue, setMinSalaryValue } from "@/store/slices/filter-slice";
import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { FC, ChangeEvent, MouseEvent } from "react";
import styles from "../styles/salary-input.module.scss";

type SalaryValueAction = typeof setMinSalaryValue | typeof setMaxSalaryValue;

interface SalaryInputProps {
  placeholder?: string;
  salaryType: `min` | "max";
}

interface InputOptions {
  dataElemAttribute: string;
  currentSalaryValue: ISalary;
  salaryValueAction: SalaryValueAction;
}

const SalaryInput: FC<SalaryInputProps> = ({ placeholder, salaryType }) => {
  const { from: minSalary, to: maxSalary } = useSelectorTyped((store) => store.filters);
  const { currentSalaryValue, salaryValueAction, dataElemAttribute } = getOptions(salaryType);
  const dispatch = useDispatchTyped();

  function getOptions(salaryType: string): InputOptions {
    return {
      currentSalaryValue: salaryType === "min" ? minSalary : maxSalary,
      salaryValueAction: salaryType === "min" ? setMinSalaryValue : setMaxSalaryValue,
      dataElemAttribute: salaryType === "min" ? "salary-from-input" : "salary-to-input",
    };
  }

  function handlerOnChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value.replace(/[^\d]/g, "");
    const updatedInputValue = inputValue ? +inputValue : "";
    dispatch(salaryValueAction(updatedInputValue));
  }

  function setSalaryValue(event: MouseEvent<HTMLButtonElement>) {
    const input = event.target as HTMLElement;
    const salary = getSalaryValue(input);
    dispatch(salaryValueAction(salary));
  }

  function getSalaryValue(input: HTMLElement): number {
    if (input.classList.contains(`${styles.increase}`)) {
      return +currentSalaryValue + 5000;
    }

    if (input.classList.contains(`${styles.reduce}`) && +currentSalaryValue) {
      return +currentSalaryValue - 5000 > 0 ? +currentSalaryValue - 5000 : 0;
    }

    return 0;
  }

  return (
    <div className={styles.input}>
      <input className={styles.input__element} type='text' placeholder={placeholder} onChange={handlerOnChange} value={salaryType === "min" ? minSalary : maxSalary} data-elem={dataElemAttribute} />
      <button className={`${styles.input__button} ${styles.increase}`} onClick={setSalaryValue}></button>
      <button className={`${styles.input__button} ${styles.reduce}`} onClick={setSalaryValue}></button>
    </div>
  );
};

export default SalaryInput;
