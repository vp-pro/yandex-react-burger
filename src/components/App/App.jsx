import styles from './App.module.css'
import PageLayout from '../PageLayout/PageLayout'

import { Route, Routes } from 'react-router-dom';
import {HomePage, Page404, LoginPage, ForgotPasswordPage, ProfilePage, RegisterPage, ResetPasswordPage} from '../../pages/index'

const App = () => {
    console.log(HomePage)
    return (
        <>
            <Routes>
                <Route element={<PageLayout/>}>
                    <Route exact path="/" element={<HomePage/>} />
                    
                    <Route exact path="/login" element={<LoginPage/>} />
                    <Route exact path="/register" element={<RegisterPage/>} />

                    <Route exact path="/profile" element={<ProfilePage/>} />

                    <Route exact path="/forgot-password" element={<ForgotPasswordPage/>} />
                    <Route exact path="/reset-password" element={<ResetPasswordPage/>} />
                </Route>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </>

    );
}

export default App;