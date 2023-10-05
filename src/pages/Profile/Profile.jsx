import Layout from '../../components/PageLayout/PageLayout';
import styles from './Profile.module.css';
import { NavLink, Outlet } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <Layout centered>
      <div className={styles.profileContainer}>
        
        <nav className={styles.navigation}>
        <ul className={styles.navigationList}>
          <li className={styles.navigationItem}>          
              <NavLink end  className={({isActive}) => isActive ? styles.activeNav: styles.nav} to="/profile" >
                Профиль
              </NavLink>
            </li>
            <li className={styles.navigationItem}>
              <NavLink end  className={({isActive}) => isActive ? styles.activeNav: styles.nav} to="/profile/orders" >
                История заказов
              </NavLink>
            </li>
            <li className={styles.navigationItem}>
              <NavLink className={styles.nav} to="/">
                Выход
              </NavLink>
            </li>
          </ul>
          {<p >В этом разделе вы можете изменить свои персональные данные</p>}
        </nav>


        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
