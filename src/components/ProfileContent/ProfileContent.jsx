import styles from './ProfileContent.module.css';
import React from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access state
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {patchUser} from '../../services/slices/userSlice'
import PropTypes from 'prop-types'



const ProfileContentPage = () => {

  const [buttonsDisabled, setButtonsDisabled] = React.useState(true);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);

  const [name, setName] = React.useState(user.name); 
  const [login, setLogin] = React.useState(user.email); 
  const [password, setPassword] = React.useState(null);

  const [nameDisabled, setNameDisabled] = React.useState(true);
  const [loginDisabled, setLoginDisabled] = React.useState(true);
  const [passwordDisabled, setPasswordDisabled] = React.useState(true);



  const handleAcceptClick = () => {
    // Assuming you have a Redux action called patchUser that sends a patch request to update the user.
    dispatch(patchUser({ name: name, email: login, password: password }))
      .unwrap()
      .then(() => {
        // The update was successful.
        // You can add further actions here.
        setNameDisabled(true);
        setLoginDisabled(true);
        setPasswordDisabled(true);
        setButtonsDisabled(true)
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message to the user.
        console.error("Error updating user:", error);
      });
  };


  const handleRevertClick = () =>{
    setName(user.name)
    setLogin(user.email)
    setPassword(null)
    setNameDisabled(true)
    setLoginDisabled(true)
    setPasswordDisabled(true)
    setButtonsDisabled(true)
  }

  return (
    <div>
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
            onIconClick={() => {
              setPasswordDisabled(!passwordDisabled)
            }}
          />
          {!buttonsDisabled && <div className={styles.buttonSection}>
          <Button htmlType="button" type="primary" size="medium" extraClass={styles.button} onClick={handleAcceptClick}>
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
