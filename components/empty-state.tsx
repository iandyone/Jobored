import { FC, ReactNode } from "react";
import Image from "next/image";
import emptyLogo from "../public/empty.svg";
import styles from "../styles/empry.module.scss"

interface EmptyStateProps {
  children: ReactNode;
  className?: string;
}

const EmptyState: FC<EmptyStateProps> = ({ children, className }) => {
  return (
    <>
      <div className={`${className} ${styles.empty}`}>
        <Image src={emptyLogo} alt='empty-logo' priority/>
        {children}
      </div>
    </>
  );
};

export default EmptyState;
