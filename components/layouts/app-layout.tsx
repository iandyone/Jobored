import { FC } from "react";
import { Inter } from "next/font/google";
import { LayoutProps } from "@/types";
import { useDispatchTyped, useSelectorTyped } from "@/hooks/redux";
import { closeSidesMenu } from "@/store/slices/menu-slice";
import Header from "../header";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const AppLayout: FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatchTyped();

  function handlerCloseMenu() {
    dispatch(closeSidesMenu());
  }

  return (
    <>
      <Head>
        <meta name='description' content='Jobored - job search application' />
        <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={inter.className} onClick={handlerCloseMenu}>
        <Header />
        {children}
      </div>
    </>
  );
};

export default AppLayout;