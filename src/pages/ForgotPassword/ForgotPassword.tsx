import styles from'./ForgotPassword.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Layout from '../../components/PageLayout/PageLayout'
import React from 'react';
import { url } from '../../utils/api';
import { useNavigate } from 'react-router-dom'

const ForgotPasswordPage: React.FC = () => {
      const [email, setEmail] = React.useState<string>()

      const navigate = useNavigate()

      const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
            const requestBody = {
              email,
            };
            try {
              const response = await fetch(
                url.passwordReset,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(requestBody),
                }
              );
              if (response.ok) {
                localStorage.setItem('reset_password_process', 'true');
                navigate('/reset-password');
              } else {
                console.error('Reset email sending failed');
              }
            } catch (error: any) {
              console.error('An error occurred:', error);
            }
          };

      return (
        <Layout centered>
          <div className={styles.mainContainer}>
            <p className="text text_type_main-large mb-4">
                  Восстановление пароля
            </p>
            <form onSubmit={handleResetPassword}>
              <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email|| ''}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-4"
              />

              <Button htmlType='submit' extraClass="mb-10">
                Восстановить
              </Button>
            </form>

            <div className={styles.footerTitles}>
              <span className={styles.restorePasswordText}>
                Восстановить пароль?
              </span>
              <Button htmlType="button" type="secondary" size="medium" extraClass="m-1 p-1">
                Войти
              </Button>
            </div>

          </div>
        </Layout>


      );
};

export default ForgotPasswordPage;


