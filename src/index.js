import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'tailwindcss/tailwind.css';

import App from './App';
import Sidebar from './views/Componentes/Sidebar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='bg-gradient-to-t from-[#1F2026] via-black to-[#37383F]'>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
