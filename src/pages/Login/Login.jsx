import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Layout from '../../components/PageLayout/PageLayout'
import React from 'react';

import styles from './Login.module.css'
const LoginPage = () => {

  const [password, setPassword] = React.useState('password')
  const [email, setEmail] = React.useState('bob@example.com')

  const onPasswordChange = e => {
    setPassword(e.target.value)
  }
  const onEmailChange = e => {
    setEmail(e.target.value)
  }
  return (
    <Layout centered='true'>
      <div className={styles.mainContainer}>
        <p className="text text_type_main-large mb-4">Вход</p>     
        <EmailInput
          onChange={onEmailChange}
          value={email}
          name={'email'}
          isIcon={false}
          extraClass="mb-4"
        />
        <PasswordInput
          onChange={onPasswordChange}
          value={password}
          name={'password'}
          extraClass="mb-4"
        />

        <Button extraClass="mb-10">
          Войти
        </Button>   
        <div style={{ display: 'inline-block' }}>
          <span className="text text_type_text-medium" style={{color: 'var(--text-inactive-color)' }}>
            Вы - новый пользователь?
          </span>
          <Button htmlType="button" type="secondary" size="medium" extraClass="m-1 p-1">
            Зарегистрироваться
          </Button>
        </div>

        <div style={{ display: 'inline-block' }}>
          <span className="text text_type_text-medium" style={{color: 'var(--text-inactive-color)'}}>
            Забыли пароль?
          </span>
          <Button htmlType="button" type="secondary" size="medium" extraClass="m-1 p-1">
            Восстановить пароль
          </Button>
        </div>

      </div>
    </Layout>
       
      
  );
};

export default LoginPage;


