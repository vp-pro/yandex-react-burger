import styles from './ProfileContent.module.css';
import React from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux'; // Import useSelector to access state

const ProfileContentPage = () => {
  // Use useSelector to get user information from userSlice
  const user = useSelector((state) => state.user.user);

  const [name, setName] = React.useState(user.name || ''); // Initialize with user data if available
  const [login, setLogin] = React.useState(user.email || ''); // Initialize with user data if available
  const [password, setPassword] = React.useState('*****'); // Initialize with default value

  const [nameDisabled, setNameDisabled] = React.useState(true);
  const [loginDisabled, setLoginDisabled] = React.useState(true);
  const [passwordDisabled, setPasswordDisabled] = React.useState(true);

  return (
    <div>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={(e) => setName(e.target.value)}
        value={name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        disabled={nameDisabled}
        size={'default'}
        extraClass="mb-6"
        icon="EditIcon"
        onIconClick={() => setNameDisabled(!nameDisabled)}
      />
      <Input
        onChange={(e) => setLogin(e.target.value)}
        placeholder={'Логин'}
        value={login}
        name={'login'}
        extraClass="mb-6"
        disabled={loginDisabled}
        icon="EditIcon"
        onIconClick={() => setLoginDisabled(!loginDisabled)}
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        disabled={passwordDisabled}
        value={password}
        name={'password'}
        extraClass="mb-6"
        icon="EditIcon"
        onIconClick={() => setPasswordDisabled(!passwordDisabled)}
      />
    </div>
  );
};

export default ProfileContentPage;
