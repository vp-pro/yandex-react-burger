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
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRouteElement/ProtectedRouteElement'
import { useDispatch } from 'react-redux';
import { checkUserAuth } from '../../services/slices/userSlice'
import { useEffect } from 'react';
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal'

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const background = location.state && location.state.background;
    const navigate = useNavigate();
    const handleModalClose = () => {
        // Возвращаемся к предыдущему пути при закрытии модалки
        navigate(-1);
    };

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);

    return (
        <>
            <Routes location={background || location}>
                <Route element={<AppPageLayout />}>
                    <Route index element={<HomePage />} />
                    <Route exact path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
                    <Route exact path="/register" element={<RegisterPage />} />
                    <Route path="/ingredients/:id" element={<BurgerIngredients />} />

                    <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
                        <Route index element={<ProfileContentPage />} />
                        <Route path="orders" element={<ProfileOrdersPage />} />
                        <Route path="orders/:id" element={<ProfileOrderDetailsPage />} />
                    </Route>

                    <Route exact path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
                    <Route exact path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />

                    <Route exact path='/ingredients/:id' element={<IngredientDetails />} />

                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>

            {background && (
                <Routes>
                    <Route element={<AppPageLayout />}>
                        <Route
                            path='/ingredients/:id'
                            element={
                                <Modal onClose={handleModalClose}>
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                    </Route>

                </Routes>
            )}
        </>

    );
}

export default App;