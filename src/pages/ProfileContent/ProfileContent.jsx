import styles from'./ProfileContent.module.css'

import React from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileContentPage = () => {
    const [name, setName] = React.useState('Марк')
    const [login, setLogin] = React.useState('mail@stellar.burgers')
    const [password, setPassword] = React.useState('*****')

    const [nameDisabled, setNameDisabled] = React.useState(true)
    const [loginDisabled, setLoginDisabled] = React.useState(true)
    const [passwordDisabled, setPasswordDisabled] = React.useState(true)

  return (
    <div>
        <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setName(e.target.value)}
        value={name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        disabled={nameDisabled}
        size={'default'}
        extraClass="mb-6"

        icon='EditIcon'
        onIconClick={e=>setNameDisabled(!nameDisabled)}

    />
        <Input
            onChange={e => setLogin(e.target.value)}
            placeholder={'Логин'}
            value={login}
            name={'login'}
            isIcon={false}
            extraClass="mb-6"
            disabled={loginDisabled}
            icon='EditIcon'
            onIconClick={e=>setLoginDisabled(!nameDisabled)}
        />
        <PasswordInput
            onChange={e => setPassword(e.target.value)}
            
            disabled={passwordDisabled}
            value={password}
            name={'password'}
            extraClass="mb-6"

            icon='EditIcon'
            onIconClick={e=>setPasswordDisabled(!nameDisabled)}
        />
    </div>
  );
};

export default ProfileContentPage;


