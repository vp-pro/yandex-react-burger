import React from 'react';
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Layout from '../../components/PageLayout/PageLayout';
import styles from './Register.module.css';
import { register } from '../../services/slices/userSlice'; // Import userSlice from its relative path
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAppDispatch } from '../../services/store';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the '/register' route
  };


  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ email, name, password }))
      .then((response) => {
        if (register.fulfilled.match(response)) {
          navigate('/');
        } else if (register.rejected.match(response)) {
          console.error('Registration rejected:', response.payload);
        }
      })
      .catch((error: any) => {
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

        <Button htmlType="submit"  extraClass="mb-20 mt-4" >
          Зарегистрироваться
        </Button>
        </form>
        <div className={styles.footerTitles}>
          <span className={styles.footerText}>
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
