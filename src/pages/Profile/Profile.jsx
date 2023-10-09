import Layout from '../../components/PageLayout/PageLayout';
import styles from './Profile.module.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch } from 'react-redux'; // Import useDispatch
import { logout } from '../../services/slices/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  


  return (
    <Layout centered>
      <div className={styles.profileContainer}>
        
        <nav className={styles.navigation}>
              <NavLink end className={({isActive}) => isActive ? styles.activeLink + " "+ styles.navLink: styles.inactiveLink + " "+ styles.navLink} to="/profile" >
                Профиль
              </NavLink>

              <NavLink end to="/profile/orders" className={({isActive}) => isActive ? styles.activeLink + " "+ styles.navLink: styles.inactiveLink + " "+ styles.navLink} >
                История заказов
              </NavLink>

              <NavLink onClick={handleLogout} className={styles.inactiveLink + " "+ styles.navLink} >
                Выход
              </NavLink>
              {<p className={styles.lowerText + ' mt-20'}>В этом разделе вы можете изменить свои персональные данные</p>}
        </nav>


        <div className={styles.content + ' ml-15'}>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
