import styles from './App.module.css'
import AppPageLayout from '../AppPageLayout/AppPageLayout'
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import {
    HomePage,
    Page404,
    LoginPage,
    ForgotPasswordPage,
    ProfilePage, 
    RegisterPage, 
    ResetPasswordPage, 
    ProfileOrdersPage, 
    ProfileOrderDetailsPage, 
    ProfileContentPage
} from '../../pages/index'
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement'

const App = () => {
    const user = useSelector((state) => state.user);
    const all = useSelector((state) => state.auth);
    console.log(all, user)

    return (
        <>
            <Routes>
                <Route element={<AppPageLayout />}>
                    <Route index element={<HomePage />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/register" element={<RegisterPage />} />

                    {/* <Route exact path="/profile" element={<ProfilePage/>} /> */}
                    {/* <Route exact path="/profile/orders" element={<ProfilePage/>} />
                    <Route exact path="/profile/orders/:id" element={<ProfilePage/>} /> */}

                    <Route path="/profile" element={<ProfilePage />}>
                        <Route index element={<ProfileContentPage />} />
                        <Route path="orders" element={<ProfileOrdersPage />} />
                        <Route path="orders/:id" element={<ProfileOrderDetailsPage />} />
                    </Route>

                    <Route exact path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPasswordPage />} />} />
                    <Route exact path="/reset-password" element={<ProtectedRouteElement element={<ResetPasswordPage />}/>} />
                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>

    );
}

export default App;