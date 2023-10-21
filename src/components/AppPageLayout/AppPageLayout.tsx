import AppHeader from '../AppHeader/AppHeader'
import { Outlet } from 'react-router-dom'
const AppPageLayout: React.FC = () => {

    return (
        <>
            <AppHeader />   
            <Outlet/>
        </>
    )
}

export default AppPageLayout