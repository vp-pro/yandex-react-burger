import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPassword.module.css'
import { doResetPasswordURL } from '../../utils/api';
import Layout from '../../components/PageLayout/PageLayout';
import React from 'react';
const ResetPasswordPage = () => {
    const [newPass, setNewPass] = React.useState()
    const [code, setCode] = React.useState()

    const handleResetPassword = async () => {
        const requestBody = {
            newPass,
            code,
        };

        try {
            const response = await fetch(
                doResetPasswordURL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (response.ok) {
                // You can handle redirection or display a success message here
                console.log('Password successfully reset');
            } else {
                // Handle errors here
                console.error('Password reset failed');
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
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    name={'code'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-4"
                />
                <Button extraClass="mb-10" onClick={handleResetPassword}>
                    Сохранить
                </Button>   
            </div>

        </Layout>
    );
};

export default ResetPasswordPage;


