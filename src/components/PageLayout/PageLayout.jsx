import AppHeader from '../AppHeader/AppHeader'
import { Outlet } from 'react-router-dom'
const PageLayout = () => {

    return (
        <>
            <AppHeader />   
            <Outlet/>
        </>
    )
}

export default PageLayout