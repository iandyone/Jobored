import { LayoutProps } from "@/types";
import { FC } from "react";
import Head from "next/head";
import styles from "../../styles/favorites.module.scss";

const FavoritesLayout: FC<LayoutProps> = ({ children, className }) => {
  return (
    <>
      <Head>
        <title>Jobored | Favorites</title>
      </Head>
      <section className={`${styles.favorites} ${className}`}>
        <div className={`${styles.favorites__container} container`}>
          <div className={styles.favorites__body}>{children}</div>
        </div>
      </section>
    </>
  );
};

export default FavoritesLayout;
