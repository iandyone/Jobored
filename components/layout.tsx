import { FC, ReactNode } from "react";
import Header from "./header";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={inter.className}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
