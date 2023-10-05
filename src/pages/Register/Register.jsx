import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Layout from '../../components/PageLayout/PageLayout'
import React from 'react';
import styles from'./Register.module.css'




const RegisterPage = () => {

    const [password, setPassword] = React.useState()
    const [email, setEmail] = React.useState()
    const [name, setName] = React.useState()

    const onPasswordChange = e => {
      setPassword(e.target.value)
    }
    const onEmailChange = e => {
      setEmail(e.target.value)
    }
    return (
      <Layout centered='true'>
        <div className={styles.mainContainer}>
          <p className="text text_type_main-large mb-4">Регистрация</p>     
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setName(e.target.value)}
            value={name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-4"
          />
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
            Зарегистрироваться
          </Button>   
          <div style={{ display: 'inline-block' }}>
            <span className="text text_type_text-medium" style={{color: 'var(--text-inactive-color)' }}>
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








