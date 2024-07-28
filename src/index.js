import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'tailwindcss/tailwind.css';

//import App from './App';
import Cadastro from './views/cadastro/cadastro';
// import Login from './views/login/Login';
//import RecuperacaoSenha from './views/login/RecuperacaoSenha';
//import ConfirmarEmail from "./views/login/ConfirmarEmail";
//import NovaSenha from "./views/login/NovaSenha"
//import SenhaAtualizada from "./views/login/SenhaAtualizada";
//import ConfirmarCadastro from './views/cadastro/ConfirmarCadastro';
//import ConfirmarCadastro from './views/cadastro/ConfirmarCadastro';
// import CadastroCompleto from './views/cadastro/CadastroCompleto';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='bg-gradient-to-t from-[#1F2026] via-black to-[#37383F]'>
    <React.StrictMode>
      <Cadastro />
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
