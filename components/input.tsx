import { ChangeEvent, FC, MouseEvent, useState } from "react";
import styles from "../styles/input.module.scss";

interface InputProps {
  type: "text" | "number";
  valueType: string;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ type, placeholder, valueType }) => {
  const [value, setValue] = useState<string | number>("");

  function handlerOnChange(e: ChangeEvent<HTMLInputElement>) {
    const checkDigits = /^[0-9]*$/;
    const value = e.target.value;

    if (!value) {
      setValue("");
      return;
    }

    if (checkDigits.test(value) && value != "+") {
      setValue(+e.target.value);
    }
  }

  function changeValue(e: MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLElement;

    if (target.classList.contains(`${styles.increase}`)) {
      setValue(+value + 1);
      return;
    }

    if (target.classList.contains(`${styles.reduce}`) && +value) {
      setValue(+value - 1);
      return;
    }
  }

  if (type === "number") {
    return (
      <div className={styles.input}>
        <input className={styles.input__element} type={type} placeholder={placeholder} onChange={handlerOnChange} value={value} />
        <button className={`${styles.input__button} ${styles.increase}`} onClick={changeValue}></button>
        <button className={`${styles.input__button} ${styles.reduce}`} onClick={changeValue}></button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.input}>
        <input className={styles.input__element} type={type} placeholder={placeholder} onChange={handlerOnChange} value={value} />
      </div>
    </>
  );
};

export default Input;
