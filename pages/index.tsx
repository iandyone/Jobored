import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import FiltersBar from "@/components/filtersBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jobored | Main</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section className={styles.jobs}>
        <div className='jobs__container container'>
          <div className='jobs__body'>
            <FiltersBar />
          </div>
        </div>
      </section>
    </>
  );
}
