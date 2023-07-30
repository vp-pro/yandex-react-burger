import styles from './App.module.css'
import PageLayout from '../PageLayout/PageLayout'

import { Route, Routes } from 'react-router-dom';
import {HomePage, Page404} from '../../pages/index'

const App = () => {
    console.log(HomePage)
    return (
        <>
            <Routes>
                <Route element={<PageLayout/>}>
                    <Route exact path="/" element={<HomePage/>} />
                </Route>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </>

    );
}

export default App;