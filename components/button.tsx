import { FC } from "react";

interface ButtonProps {
  className: string;
  text: string;
}

const Button: FC<ButtonProps> = ({ className, text }) => {
  return <button className={`${className} button`}>{text}</button>;
};

export default Button;
