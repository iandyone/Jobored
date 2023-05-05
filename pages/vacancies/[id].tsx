import Vacancy from "@/components/vacancy";
import { useSelectorTyped } from "@/hooks/redux";
import { vacanciesApi } from "@/store/api/vacancies-api";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/vacancy-page.module.scss";
import { FC, ReactNode, useEffect } from "react";
import parse from "html-react-parser";

const VacansyPage: FC = () => {
  const router = useRouter();
  const { current: vacancies } = useSelectorTyped((store) => store.vacancies);
  const { id } = router.query;
  const vacancy = vacancies.find((vacancy) => vacancy.id === +id!);
  const text = parse(vacancy ? vacancy.vacancyRichText : "");
  const classNames = {
    container: styles.vacancy__card,
    title: styles.vacancy__title,
    text: styles.vacancy__text,
  }

  return (
    <>
      <div className={styles.vacancy}>
        <div className={`${styles.vacancy__container} container`}>
          <Vacancy loading={vacancy ? false : true} vacancy={vacancy!} classNames={classNames} />
          <div className={styles.vacancy__description}>{text}</div>
        </div>
      </div>
      {/* {vacancy && <div dangerouslySetInnerHTML={vacancy.vacancyRichText} />} */}
    </>
  );
};

export default VacansyPage;

/* 

<p>Ищем талантливого Java-разработчика для работы над задачами команды ДКБ CRM.</p>
          <p>В работе используем стек технологий и инструменты: Java 14, Spring Framework 5, Hibernate Oracle, PostgreSQL, Mockito, Jenkins, Tomcat, Kafka.</p>
          <p>Методология разработки - "Scrumban".</p>
          <p>В команде есть владелец продукта, техлид, тимлид, аналитики, разработчики, скрам-мастер.</p>
          <p>Что предстоит:</p>
          <ul>
            <li>Разработка архитектуры и самого решения для backend части приложения;</li>
            <li>Проектирование и разработка интерфейсов приложений/ключевых технологических и прикладных микросервисов платформы;</li>
            <li>Внедрять новые фичи - мы активно работаем с фидбеком клиентов и постоянно улучшаем наши продукты</li>
            <li>Оптимизировать скорость работы приложений (куда без этого);</li>
            <li>Взаимодействие с разработчиками, аналитиками, дизайнерами и другими командами</li>
          </ul>
          <p>Нам нужен человек, который:</p>
          <ul>
            <li>Высшее техническое, математическое или другое профильное образование (в том числе курсы повышения квалификации) в сфере ИТ;</li>
            <li>Java SE 8 или выше, Spring Framework 5, принципы SOLID;</li>
            <li>Знание паттернов проектирования;</li>
            <li>Знание методологии TDD и понимание, как правильно писать тесты (модульные, интеграционные);</li>
          </ul>
          <p>Будет плюсом:</p>
          <ul>
            <li>Опыт разработки на Groovy.</li>
            <li>Опыт разработки Enterprise приложений;</li>
            <li>Знание шаблона проектирования Domain-Driven Design;</li>
            <li>Умение писать SQL запросы.</li>
          </ul>
          <p>Мы предлагаем:</p>
          <ul>
            <li>Гибкий график и удаленный формат;</li>
            <li>Развитие внутри команды, регулярные code review;</li>
            <li>Уровень ЗП обсуждаем индивидуально (ожидания+скиллы), все белое, полное соблюдение ТК РФ;</li>
            <li>ДМС + стоматология;</li>
            <li>Наши сотрудники имеют возможность оформить льготные кредиты и ипотеку;</li>
            <li>Увлекательную корпоративную жизнь и даже удаленно.</li>
          </ul>
*/
