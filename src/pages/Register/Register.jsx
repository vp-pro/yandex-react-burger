import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Layout from '../../components/PageLayout/PageLayout';
import styles from './Register.module.css';
import { updateRegistration, register } from '../../services/slices/userSlice'; // Import userSlice from its relative path

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { email, name, password } = useSelector((state) => state.user.registration);
  const {registration} = useSelector((state) => state.user)

  const handleFieldChange = (field, value) => {
    // Dispatch the action to update the user slice field
    dispatch(updateRegistration({ field, value }));
    console.log(registration)
  };

  const handleRegistration = () => {
    // Dispatch the register action with user registration data
    dispatch(register({ email, name, password }));
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

        <Button extraClass="mb-10" onClick={handleRegistration}>
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
