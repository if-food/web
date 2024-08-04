
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./views/login/Login";
import RecuperacaoSenha from './views/login/RecuperacaoSenha';
import ConfirmarEmail from './views/login/ConfirmarEmail';
import NovaSenha from './views/login/NovaSenha';
import SenhaAtualizada from './views/login/SenhaAtualizada'

import CadastroInicial from './views/cadastro/CadastroInicial';
import ConfirmarCadastro from './views/cadastro/ConfirmarCadastro';
// import Cadastro from './views/cadastro/Cadastro';
import Home from './views/Home/Home';
import Restaurantes from './views/Home/Restaurantes';





function App() {
  return (    
    <Router>
      <Routes>

        {/*rotas login*/}
        <Route path='/' element={<Login />} />
        <Route path='/recuperacao-senha' element={<RecuperacaoSenha />} />
        <Route path='/confirmar-email' element={<ConfirmarEmail />} />
        <Route path='/nova-senha' element={<NovaSenha />} />
        <Route path='/senha-atualizada' element={<SenhaAtualizada />} />
       
       {/*rotas cadastro*/}
       <Route path='/cadastro-inicial' element={<CadastroInicial />} />
       {/* <Route path='/cadastro' element={< Cadastro/>} /> */}
       <Route path='/confirmar-cadastro' element={< ConfirmarCadastro/>} />

       {/*rotas home*/}
       <Route path='/home' element={< Home/>} />
       <Route path='/restaurantes' element={< Restaurantes/>} />

      </Routes>
    </Router>

  );
}

export default App;
