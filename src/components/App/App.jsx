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
import {OnlyAuth, OnlyUnAuth} from '../ProtectedRouteElement/ProtectedRouteElement'
import { useDispatch } from 'react-redux';
import {checkUserAuth} from '../../services/slices/userSlice'
import { useEffect } from 'react';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(checkUserAuth());
    }, []);

    return (
        <>
            <Routes>
                <Route element={<AppPageLayout />}>
                    <Route index element={<HomePage />} />
                    <Route exact path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
                    <Route exact path="/register" element={<RegisterPage />} />

                    {/* <Route exact path="/profile" element={<ProfilePage/>} /> */}
                    {/* <Route exact path="/profile/orders" element={<ProfilePage/>} />
                    <Route exact path="/profile/orders/:id" element={<ProfilePage/>} /> */}

                    <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
                        <Route index element={<ProfileContentPage />} />
                        <Route path="orders" element={<ProfileOrdersPage />} />
                        <Route path="orders/:id" element={<ProfileOrderDetailsPage />} />
                    </Route>

                    <Route exact path="/forgot-password" element={<OnlyAuth component={<ForgotPasswordPage />} />} />
                    <Route exact path="/reset-password" element={<OnlyAuth component={<ResetPasswordPage />}/>} />
                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>

    );
}

export default App;