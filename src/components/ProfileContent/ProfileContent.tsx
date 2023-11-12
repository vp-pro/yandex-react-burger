import styles from './ProfileContent.module.css';
import React from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {patchUser} from '../../services/slices/userSlice'
import { useAppSelector } from '../../services/store';
import { useAppDispatch } from '../../services/store';
const ProfileContentPage: React.FC = () => {

  const [buttonsDisabled, setButtonsDisabled] = React.useState(true);
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user);

  const [name, setName] = React.useState<string>(user?.name || '');
  const [login, setLogin] = React.useState<string>(user?.email || '');
  const [password, setPassword] = React.useState<string>('');

  const [nameDisabled, setNameDisabled] = React.useState<boolean>(true);
  const [loginDisabled, setLoginDisabled] = React.useState<boolean>(true);
  const [passwordDisabled, setPasswordDisabled] = React.useState<boolean>(true);

  const handleAcceptClick = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(patchUser({ name: name, email: login, password: password }))
      .unwrap()
      .then(() => {
        setNameDisabled(true);
        setLoginDisabled(true);
        setPasswordDisabled(true);
        setButtonsDisabled(true)
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };


  const handleRevertClick = (e: React.FormEvent) =>{
    e.preventDefault()

    setName(user?.name || '')
    setLogin(user?.email || '')
    setPassword('')
    setNameDisabled(true)
    setLoginDisabled(true)
    setPasswordDisabled(true)
    setButtonsDisabled(true)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleAcceptClick}>
        <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => {
              setButtonsDisabled(false)
              setName(e.target.value)
            }}
            value={name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            disabled={nameDisabled}
            size={'default'}
            extraClass="mb-6"
            icon="EditIcon"
            onIconClick={() => {
              setNameDisabled(!nameDisabled)
            }}
          />
          <Input
            onChange={(e) => {
              setButtonsDisabled(false)
              setLogin(e.target.value)
            }}
            placeholder={'Логин'}
            value={login}
            name={'login'}
            extraClass="mb-6"
            disabled={loginDisabled}
            icon="EditIcon"
            onIconClick={() => {
              setLoginDisabled(!loginDisabled)
            }}
          />
          <PasswordInput
            onChange={(e) => {
              setButtonsDisabled(false)
              setPassword(e.target.value)
            }}
            disabled={passwordDisabled}
            value={password}
            name={'password'}
            extraClass="mb-6"
            icon="EditIcon"
            // onIconClick={() => {
            //   setPasswordDisabled(!passwordDisabled)
            // }}
          />
          {!buttonsDisabled && <div className={styles.buttonSection}>
          <Button htmlType="submit" type="primary" size="medium" extraClass={styles.button} onClick={handleAcceptClick}>
              Принять изменения
          </Button>
          </div>
          }

      </form>
      { !buttonsDisabled && <div className={styles.buttonSection}>

            <Button htmlType="button" type="primary" size="medium" extraClass={styles.button} onClick={handleRevertClick}>
            Отменить
          </Button>
          </div>

        }
      </div>
  );
};

export default ProfileContentPage;
