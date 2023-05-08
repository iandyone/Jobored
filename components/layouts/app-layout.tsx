import { FC, ReactNode } from "react";
import { Inter } from "@next/font/google";
import Header from "../header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface LayoutProps {
  children: ReactNode;
}

const AppLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={inter.className}>
      <Header />
      {children}
    </div>
  );
};

export default AppLayout;