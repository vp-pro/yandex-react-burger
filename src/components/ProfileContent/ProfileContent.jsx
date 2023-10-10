import styles from './ProfileContent.module.css';
import React from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access state
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {patchUser} from '../../services/slices/userSlice'
const ProfileContentPage = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);

  const [name, setName] = React.useState(user.name); 
  const [login, setLogin] = React.useState(user.email); 
  const [password, setPassword] = React.useState(null);

  const [nameDisabled, setNameDisabled] = React.useState(true);
  const [loginDisabled, setLoginDisabled] = React.useState(true);
  const [passwordDisabled, setPasswordDisabled] = React.useState(true);




  const handleAcceptClick= ()=> {
    const nameSend = name ? name : null;
    const loginSend = login ? login : null;
    const passSend = password ? password : null;

    console.log({nameSend, loginSend, passSend})
    // dispatch(patchUser({name, login, password}))
    // .unwrap()
    // .then(() => {
    //   .then(() => dispatch(second).unwrap());
    //   setNameDisabled(true)
    //   setLoginDisabled(true)
    //   setPasswordDisabled(true)
    // }
    // )

  }
  const handleRevertClick = () =>{
    setName(user.name)
    setLogin(user.email)
    setPassword('******')
    setNameDisabled(true)
    setLoginDisabled(true)
    setPasswordDisabled(true)
  }

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
      <div className={styles.buttonSection}>
      <Button htmlType="button" type="primary" size="small" extraClass="p-5" onClick={handleRevertClick}>
          Отменить
        </Button>
        <Button htmlType="button" type="primary" size="small" extraClass="p-5" onClick={handleAcceptClick}>
          Принять изменения
        </Button>
      </div>
    </div>
  );
};

export default ProfileContentPage;
