import { useAppSelector } from '../../services/store';

const ProfileOrdersPage: React.FC = () => {
   
  const user = useAppSelector(state => state.user.user)
  return (
        <div>
          All Orders of {user?.name}
        </div>
  );
};

export default ProfileOrdersPage;


