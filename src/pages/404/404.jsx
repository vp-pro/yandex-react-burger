import React from 'react';
import styles from './404.module.css'; // CSS module for styling
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';


const Page404 = () => {
    const navigate = useNavigate()

    const handleOnClick = (e) =>{
        e.preventDefault();
        navigate('/')
    }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Упс! Страница не найдена!</p>
        <Button onClick={handleOnClick} htmlType="button" type="primary" size="large" extraClass={styles.Button}>
            Вернуться домой
        </Button>
      </div>
    </div>
  );
};

export default Page404;