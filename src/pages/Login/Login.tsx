import React from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Layout from '../../components/PageLayout/PageLayout';
import styles from './Login.module.css';
import { login } from '../../services/slices/userSlice'; // Import loginSlice from its relative path
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAppDispatch } from '../../services/store';

const LoginPage: React.FC = () => {

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the '/register' route
  };

  const handlePasswordResetClick = () => {
    navigate('/forgot-password'); // Navigate to the '/password-reset' route
  };


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }))
    };

  return (
    <Layout centered={true}>
      <div className={styles.mainContainer+ ' ' + 'mt-20'}>
        <p className="text text_type_main-large mb-6">Вход</p>
        <form onSubmit={handleLogin}>
          <EmailInput
            onChange={(e) => setEmail(e.target.value )}
            value={email}
            name="email"
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            extraClass="mb-6"
          />

          <Button htmlType="submit" extraClass="mb-20">
            Войти
          </Button>
        </form>
        
        <div style={{ display: 'inline-block' }}className='mb-2'>
          <span className="text text_type_text-medium" style={{ color: 'var(--text-inactive-color)' }}>
            Вы - новый пользователь?
          </span>
          <Button htmlType="button" type="secondary" size="medium" extraClass="m-1 p-1" onClick={handleRegisterClick}>
            Зарегистрироваться
          </Button>
        </div>

        <div style={{ display: 'inline-block' }}>
          <span className="text text_type_text-medium" style={{ color: 'var(--text-inactive-color)' }}>
            Забыли пароль?
          </span>
          <Button htmlType="button" type="secondary" size="medium" extraClass="m-1 p-1" onClick={handlePasswordResetClick} > 
            Восстановить пароль
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
