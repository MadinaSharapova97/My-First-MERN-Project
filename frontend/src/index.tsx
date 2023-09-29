import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Routes from './My_notes_project/routes/Routes';
import GlobalStyle from './My_notes_project/assets/styles/global'
import { BrowserRouter } from 'react-router-dom';
import Context from './My_notes_project/context/Context';
import { ToastContainer } from 'react-toastify'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Context>
        <GlobalStyle />
        <Routes />
        <ToastContainer/>
      </Context>

    </BrowserRouter> */}
        <App />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
