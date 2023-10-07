import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Layout from '../../components/PageLayout/PageLayout';
import styles from './Register.module.css';
import { updateRegisterUser, register } from '../../services/slices/registerSlice'; // Import userSlice from its relative path
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Cookies from 'js-cookie';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { email, name, password } = useSelector((state) => state.register.user);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const handleFieldChange = (field, value) => {
    dispatch(updateRegisterUser({ field, value }));
  };

  const handleRegistration = () => {
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
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => handleFieldChange('name', e.target.value)}
          value={name}
          name="name"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="mb-4"
        />
        <EmailInput
          onChange={(e) => handleFieldChange('email', e.target.value)}
          value={email}
          name="email"
          isIcon={false}
          extraClass="mb-4"
        />
        <PasswordInput
          onChange={(e) => handleFieldChange('password', e.target.value)}
          value={password}
          name="password"
          extraClass="mb-4"
        />

        <Button extraClass="mb-20 mt-4" onClick={handleRegistration}>
          Зарегистрироваться
        </Button>
        <div style={{ display: 'inline-block' }}>
          <span className="text text_type_text-medium" style={{ color: 'var(--text-inactive-color)' }}>
            Уже зарегистрировались?
          </span>
          <Button htmlType="button" type="secondary" size="medium" extraClass="m-1 p-1">
            Войти
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
