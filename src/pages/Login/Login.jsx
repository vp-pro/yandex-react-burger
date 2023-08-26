import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
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
        <div className={styles.mainContainer}>
              <p className="text text_type_text-medium">Login</p>     
              <EmailInput
                onChange={onEmailChange}
                value={email}
                name={'email'}
                isIcon={false}
              />
              <PasswordInput
                onChange={onPasswordChange}
                value={password}
                name={'password'}
                extraClass="mb-2"
              />

              <Button></Button>   
              <div>
                <p className="text text_type_text-medium">Забыли там что-то?</p>     
                  <Button htmlType="button" type="secondary" size="medium">
                    Нажми на меня
                  </Button>
              </div>
              <div>
                <p className="text text_type_text-medium">Второе</p>     
                  <Button htmlType="button" type="secondary" size="medium">
                    Что-то там ещё?
                  </Button>
              </div>

        </div>
      
  );
};

export default LoginPage;


