import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css'
import './fonts/fonts.css'
import { Provider } from 'react-redux'
import {store} from './services/store'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>

  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <React.StrictMode>
        <Router>
            <App/>
        </Router>
      </React.StrictMode>
    </DndProvider>
  </Provider>
  // </StrictMode>


);

reportWebVitals();
