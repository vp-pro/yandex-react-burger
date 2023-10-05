import styles from'./ForgotPassword.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Layout from '../../components/PageLayout/PageLayout'
import React from 'react';
import { passwordResetURL } from '../../utils/api';
import { useNavigate } from 'react-router-dom'
const ForgotPasswordPage = () => {
      const [email, setEmail] = React.useState()
      const [isEmailSent, setIsEmailSent] = React.useState(false);

      const navigate = useNavigate() 

      const handleResetPassword = async () => {
            // Create a request body
            const requestBody = {
              email,
            };
        
            try {
              // Send a POST request to the password reset endpoint
              const response = await fetch(
                passwordResetURL,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(requestBody),
                }
              ); 
        
              if (response.ok) {
                // Password reset email sent successfully
                // You can handle redirection or display a success message here
                console.log('Reset email sent');
                console.log(response)
                navigate('/reset-password'); // Replace with the desired URL

              } else {
                // Handle errors here
                console.error('Reset email sending failed');
              }
            } catch (error) {
              console.error('An error occurred:', error);
            }
          };

      return (
        <Layout centered>
          <div className={styles.mainContainer}>
            <p className="text text_type_main-large mb-4">
                  Восстановление пароля 
            </p>     
            <Input
                  type={'email'}
                  placeholder={'Укажите e-mail'}
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  name={'email'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'}
                  extraClass="mb-4"
            />
    
            <Button extraClass="mb-10" onClick={handleResetPassword}>
              Восстановить
            </Button>   
    
            <div style={{ display: 'inline-block' }}>
              <span className="text text_type_text-medium" style={{color: 'var(--text-inactive-color)'}}>
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


