import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPassword.module.css'
import { resetPassword } from '../../services/slices/userSlice';
import Layout from '../../components/PageLayout/PageLayout';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const [newPass, setNewPass] = React.useState('');
    const [emailCode, setEmailCode] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        const isResetPassword = localStorage.getItem('reset_password_process');
        if (!(isResetPassword === 'true')) {
            navigate('/login'); // Redirect to the login page
        }
    }, [navigate]);

    const handleResetPassword = () => {
      dispatch(resetPassword({ newPass, emailCode }));
    };

    return (
        <Layout centered>
            <div className={styles.mainContainer}>
                <p className="text text_type_main-large mb-4">
                    Восстановление пароля
                </p>
                <Input
                    type={'text'}
                    placeholder={'Введите новый пароль'}
                    onChange={e => setNewPass(e.target.value)}
                    value={newPass}
                    name={'newPass'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-4"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setEmailCode(e.target.value)}
                    value={emailCode}
                    name={'emailCode'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-4"
                />
                <Button htmlType='button' extraClass="mb-10" onClick={handleResetPassword}>
                    Сохранить
                </Button>   
            </div>

        </Layout>
    );
};

export default ResetPasswordPage;


