
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ConfirmarEmail from './views/login/ConfirmarEmail';
import Login from "./views/login/Login";
import NovaSenha from './views/login/NovaSenha';
import RecuperacaoSenha from './views/login/RecuperacaoSenha';
import SenhaAtualizada from './views/login/SenhaAtualizada';

import CadastroInicial from './views/cadastro/CadastroInicial';
import ConfirmarCadastro from './views/cadastro/ConfirmarCadastro';
import Perfil from './views/cadastro/Perfil';
import NovaCategoria from './views/cardapio/novaCategoria';
import NovoItem from './views/cardapio/novoItem';
import HomeParceiros from './views/home/HomeParceiros';

import Cardapio from "./views/cardapio/cardapio";
import ListClientes from './views/Admin/ListClientes';
import ListRestaurantes from './views/Admin/ListRestaurantes';
import RestauranteDetalhes from './views/Admin/RestauranteDetalhes';
import GerenciarPedidos from './views/pedidos/GerenciarPedidos';
import HistoricoPedidos from './views/pedidos/HistoricoPedidos';


function Rotas() {
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
       <Route path='/perfil' element={< Perfil/>} />
       <Route path='/confirmar-cadastro' element={< ConfirmarCadastro/>} />

       {/*rotas home*/}
       <Route path='home-parceiros' element={< HomeParceiros/>} />

       {/*rotas cardapio*/}
       <Route path='novo-item' element={< NovoItem/>} />
       <Route path='nova-categoria' element={< NovaCategoria/>} />
      
       {/*rotas restaurante*/}
        <Route path='cardapio' element={<Cardapio/>}/> 

        {/*Pedidos*/}
        GerenciarPedidos
        <Route path='gerenciar-pedidos' element={<GerenciarPedidos/>}/> 
        <Route path='historico-pedidos' element={<HistoricoPedidos/>}/> 
        

       {/*rotas admin*/}
        <Route path='list-clientes' element={<ListClientes/>}/> 
        <Route path='list-restaurantes' element={<ListRestaurantes/>}/> 
        <Route path="restaurante-detalhes/:id" element={< RestauranteDetalhes/>} />


      </Routes>
    </Router>

  );
}

export default Rotas;
