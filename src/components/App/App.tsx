import styles from './App.module.css'
import AppPageLayout from '../AppPageLayout/AppPageLayout'
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
    ProfileContentPage,
    FeedPage
} from '../../pages/index'
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRouteElement/ProtectedRouteElement'
import { checkUserAuth } from '../../services/slices/userSlice'
import { useEffect } from 'react';
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal'
import ExtendedOrderDetailsPage from '../ExtendedOrderDetails/ExtendedOrderDetails'
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';
const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const background = location.state && location.state.background;

    const navigate = useNavigate();
    const handleModalClose = () => {
        // Возвращаемся к предыдущему пути при закрытии модалки
        navigate(-1);
    };

    const loading = useAppSelector((state) => state.ingredients.loading)

    useEffect(() => {
        dispatch(checkUserAuth());
        dispatch(fetchIngredients());
    }, []);


    return (
        <>
        {!loading &&
        <>
            <Routes location={background || location}>
                <Route element={<AppPageLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
                    <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />}/>

                    <Route path="/feed" element={<FeedPage />}/>
                    <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
                        <Route index element={<ProfileContentPage />} />
                        <Route path="orders" element={<ProfileOrdersPage />} />
                        <Route path="orders/:id" element={<ExtendedOrderDetailsPage />} />
                    </Route>

                    <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
                    <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />

                    <Route path='/ingredients/:id' element={<IngredientDetails />} />
                    <Route path='/feed/:id' element={<ExtendedOrderDetailsPage />} />
                    <Route path='/profile/orders/:id' element={<OnlyUnAuth component={<ExtendedOrderDetailsPage />} />} />


                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>

            {background && (
                <>
                <Routes>
                        <Route
                            path='/ingredients/:id'
                            element={
                                <Modal onClose={handleModalClose}>
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                        <Route
                            path='/profile/orders/:id'
                            element={
                                <Modal onClose={handleModalClose}>
                                    <ExtendedOrderDetailsPage />
                                </Modal>
                            }
                        />
                        <Route
                            path='/feed/:id'
                            element={
                                <Modal onClose={handleModalClose}>
                                    <ExtendedOrderDetailsPage />
                                </Modal>
                            }
                        />
                </Routes>
                </>
            )}
        </>
        }
        </>
    );
}

export default App;