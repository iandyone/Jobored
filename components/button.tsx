import { useDispatchTyped } from "@/hooks/redux";
import { setFilters } from "@/store/slices/filter-slice";
import { setPage } from "@/store/slices/vacancies-slice";
import { FC } from "react";

interface ButtonProps {
  className: string;
  text: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ className, text, onClick }) => {
  const dispatch = useDispatchTyped();

  function applyFilters() {
    dispatch(setFilters());
    dispatch(setPage(1));
  }

  return (
    <button className={`${className} button`} onClick={onClick ? onClick : applyFilters} data-elem='search-button'>
      {text}
    </button>
  );
};

export default Button;
