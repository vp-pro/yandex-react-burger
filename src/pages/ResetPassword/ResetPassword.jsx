import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';


const ResetPasswordPage = () => {
  return (
        <>
            <p className="text text_type_digits-medium"> </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}> 
                <EmailInput
                    name={'email'}
                    placeholder="Логин"
                    isIcon={true}
                    extraClass="mb-2"
                />
                <PasswordInput
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>
    </>
  );
};

export default ResetPasswordPage;


