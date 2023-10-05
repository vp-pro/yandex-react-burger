import AppHeader from '../AppHeader/AppHeader'
import { Outlet } from 'react-router-dom'
const AppPageLayout = () => {

    return (
        <>
            <AppHeader />   
            <Outlet/>
        </>
    )
}

export default AppPageLayout