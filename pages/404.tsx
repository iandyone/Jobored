import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EmptyState from "@/components/empty-state";
import Heading from "@/components/heading";
import Head from "next/head";
import styles from "../styles/error.module.scss";

const UnknownPage = () => {
  const router = useRouter();
  const [redirectTimer, setRedirectTimer] = useState(5);

  useEffect(() => {
    setTimeout(() => {
      if (redirectTimer) {
        setRedirectTimer(redirectTimer - 1);
      }
    }, 1010);
  }, [redirectTimer]);

  useEffect(() => {
    setTimeout(() => router.push("/"), redirectTimer * 1000);
  }, [router]);

  return (
    <>
      <Head>
        <title>Jobored | Not Found</title>
      </Head>
      <div className={styles.error}>
        <div className={`container`}>
          <EmptyState className={styles.error__empty}>
            <Heading className={styles.error__heading} text='Cтраница не найдена' tag='h2' />
            <Heading className={styles.error__heading} text={`Перенаправление на главную через ${redirectTimer} сек`} tag='h2' />
          </EmptyState>
        </div>
      </div>
    </>
  );
};

export default UnknownPage;