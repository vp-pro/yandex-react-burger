import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Layout from '../../components/PageLayout/PageLayout';
import styles from './Login.module.css';
import { login } from '../../services/slices/userSlice'; // Import loginSlice from its relative path
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Cookies from 'js-cookie';


const LoginPage = () => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const handleLogin = () => {
    dispatch(login({ email, password }))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          navigate('/');
        } else {
          console.error('Login rejected:', response.error);
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  return (
    <Layout centered={true}>
      <div className={styles.mainContainer+ ' ' + 'mt-20'}>
        <p className="text text_type_main-large mb-6">Вход</p>
        <EmailInput
          onChange={(e) => setEmail(e.target.value )}
          value={email}
          name="email"
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          extraClass="mb-6"
        />

        <Button htmlType="button" extraClass="mb-20" onClick={handleLogin}>
          Войти
        </Button>
        <div style={{ display: 'inline-block' }}className='mb-2'>
          <span className="text text_type_text-medium" style={{ color: 'var(--text-inactive-color)' }}>
            Вы - новый пользователь?
          </span>
          <Button htmlType="button" type="secondary" size="medium" extraClass="m-1 p-1">
            Зарегистрироваться
          </Button>
        </div>

        <div style={{ display: 'inline-block' }}>
          <span className="text text_type_text-medium" style={{ color: 'var(--text-inactive-color)' }}>
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
