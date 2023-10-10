import { useSelector } from 'react-redux';
import styles from'./ProfileOrders.module.css'
import { NavLink } from 'react-router-dom';

const ProfileOrdersPage = () => {
   
  const user = useSelector(state => state.user.user)
  return (
        <div>
          All Orders of {user.name}
        </div>
  );
};

export default ProfileOrdersPage;


