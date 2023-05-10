import EmptyState from "@/components/empty-state";
import Heading from "@/components/heading";
import Head from "next/head";
import styles from "../styles/error.module.scss";

const ServerError = () => {
  return (
    <>
      <Head>
        <title>Jobored | Server Error</title>
      </Head>
      <div className={styles.error}>
        <div className={`container`}>
          <EmptyState className={styles.error__empty}>
            <Heading className={styles.error__heading} text='Возникла ошибка во время получения данных с сервера' tag='h2' />
            <Heading className={styles.error__heading} text='Повторите попытку позже' tag='h2' />
          </EmptyState>
        </div>
      </div>
    </>
  );
};

export default ServerError;