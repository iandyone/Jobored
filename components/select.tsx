import { MouseEvent, FC, useState } from "react";
import styles from "../styles/select.module.scss";
import Image from "next/image";
import arrow from "../public/filters-bar/arrow.svg";
import arrowActive from "../public/filters-bar/arrow-active.svg";

interface ISelect {
  className: string;
}

const Select: FC<ISelect> = ({ className }) => {
  const [selectValue, setSelectValue] = useState("Выберите отрасль");
  const [selectActivity, setSelectActivity] = useState(false);
  const [menuVisability, setMenuVisability] = useState(false);
  const selectClassName = selectActivity ? `${className} ${styles.select} ${styles.active}` : `${className} ${styles.select}`;

  const testData = [
    { id: 1, value: "IT, интернет, связь, телеком" },
    { id: 2, value: "Кадры, управление персоналом 121212123123" },
    { id: 3, value: "Искусство, культура, развлечения" },
    { id: 4, value: "Банки, инвестиции, лизинг" },
    { id: 5, value: "Дизайн" },
    { id: 11, value: "IT, интернет, связь, телеком" },
    { id: 21, value: "Кадры, управление персоналом" },
    { id: 31, value: "Искусство, культура, развлечения" },
    { id: 41, value: "Банки, инвестиции, лизинг" },
    { id: 51, value: "Дизайн" },
  ];

  function selectOnClick(e: MouseEvent<HTMLDivElement>) {
    setMenuVisability(!menuVisability);
  }

  function optionOnClick(e: MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    const element = target.closest("li");
    setSelectValue(element!.getAttribute("data-value")!);
    setSelectActivity(true);
    setMenuVisability(false);
  }

  return (
    <div className={selectClassName} onClick={selectOnClick}>
      <span>{selectValue}</span>
      <div className={styles.select__icon}>
        <Image src={menuVisability ? arrowActive : arrow} alt='123' />
      </div>
      <ul className={menuVisability ? `${styles.select__menu} + ${styles.active}` : styles.select__menu}>
        {testData.map(({ id, value }) => {
          return (
            <li className={styles.select__option} data-value={value} onClick={optionOnClick} key={id}>
              <span>{value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
