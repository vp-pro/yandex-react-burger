import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Layout from '../../components/PageLayout/PageLayout';
import styles from './Register.module.css';
import { register } from '../../services/slices/userSlice'; // Import userSlice from its relative path
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Cookies from 'js-cookie';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the '/register' route
  };


  const handleRegistration = (e) => {
    e.preventDefault();
    dispatch(register({ email, name, password }))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          navigate('/');
        } else {
          console.error('Registration rejected:', response.error);
        }
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };
  
  return (
    <Layout centered={true}>
      <div className={styles.mainContainer}>
        <p className="text text_type_main-large mb-4">Регистрация</p>
        <form onSubmit={handleRegistration}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="mb-4"
        />
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          isIcon={false}
          extraClass="mb-4"
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          extraClass="mb-4"
        />

        <Button htmlType="button"  extraClass="mb-20 mt-4" >
          Зарегистрироваться
        </Button>
        </form>
        <div style={{ display: 'inline-block' }}>
          <span className="text text_type_text-medium" style={{ color: 'var(--text-inactive-color)' }}>
            Уже зарегистрировались?
          </span>
          <Button htmlType="button" type="secondary" size="medium" extraClass="m-1 p-1"   onClick={handleLoginClick}>
            Войти
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
