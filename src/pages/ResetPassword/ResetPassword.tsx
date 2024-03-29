import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPassword.module.css'
import { resetPassword } from '../../services/slices/userSlice';
import Layout from '../../components/PageLayout/PageLayout';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';

const ResetPasswordPage: React.FC = () => {
    const [newPass, setNewPass] = React.useState('');
    const [emailCode, setEmailCode] = React.useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        const isResetPassword = localStorage.getItem('reset_password_process');
        if (!(isResetPassword === 'true')) {
            navigate('/login'); // Redirect to the login page
        }
    }, [navigate]);

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault()
      dispatch(resetPassword({ newPass, emailCode })).unwrap().then(()=>
        localStorage.setItem('reset_password_process', 'false')
      )
    };

    return (
        <Layout centered>
            <div className={styles.mainContainer}>
                <p className="text text_type_main-large mb-4">
                    Восстановление пароля
                </p>
                <form onSubmit={handleResetPassword}>
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
                    <Button htmlType='submit' extraClass="mb-10" >
                        Сохранить
                    </Button>   
                </form>
            </div>

        </Layout>
    );
};

export default ResetPasswordPage;


