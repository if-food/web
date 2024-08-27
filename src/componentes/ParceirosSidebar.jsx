import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaRegUser, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { MdOutlineMenuBook } from "react-icons/md";
import { TbChecklist } from "react-icons/tb";
import { logout } from '../views/util/AuthenticationService';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('/home-parceiros'); // Estado do item ativo

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveItem(location.pathname); // Atualiza o item ativo com base na URL atual
  }, [location]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout(); // Executa o logout
    navigate('/'); // Redireciona para a página inicial
  };

  const handleClick = (path) => {
    navigate(path); // Navega para o caminho
  };

  return (
    <div className={`flex ${isOpen ? 'w-64' : 'w-18'} text-secondary_1 abs transition-width duration-300 mx-4 my-4`}>
      <div className="flex flex-col w-full border-2 rounded-2xl bg-white">
        <div className="flex flex-col justify-between border-2 border-secondary_1 h-full rounded-2xl">
          <div className='font-extrabold'>
            <button
              onClick={toggleSidebar}
              className="flex justify-center p-2 text-3xl font-extrabold hover:bg-secondary_2 w-full rounded-t-2xl"
            >
              {isOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
            </button>
            <div>
              <SidebarItem
                icon={<FaHome className='text-2xl' />}
                text="Home"
                isOpen={isOpen}
                isActive={activeItem === '/home-parceiros'}
                onClick={() => handleClick('/home-parceiros')}
              />
              <SidebarItem
                icon={<FaRegUser className='text-2xl' />}
                text="Perfil"
                isOpen={isOpen}
                isActive={activeItem === '/perfil'}
                onClick={() => handleClick('/perfil')}
              />
              <SidebarItem
                icon={<MdOutlineMenuBook className='text-2xl' />}
                text="Cardápio"
                isOpen={isOpen}
                isActive={activeItem === '/cardapio'}
                onClick={() => handleClick('/cardapio')}
              />
              <SidebarItem
                icon={<TbChecklist className='text-2xl' />}
                text="Pedidos"
                isOpen={isOpen}
                isActive={activeItem === '/gerenciar-pedidos'}
                onClick={() => handleClick('/gerenciar-pedidos')}
              />
              <SidebarItem
                icon={<FaHistory className='text-2xl' />}
                text="Histórico"
                isOpen={isOpen}
                isActive={activeItem === '/historico'}
                onClick={() => handleClick('/historico')}
              />
            </div>
          </div>

          <SidebarItem
            icon={<FaSignOutAlt className='text-2xl ' />}
            onClick={handleLogout}
            text="Logout"
            isOpen={isOpen}
            classLogout="hover:rounded-b-2xl font-extrabold"
          />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, isOpen, onClick, classLogout, isActive }) => (
  <div
    className={`flex items-center p-4 hover:bg-secondary_2 cursor-pointer ${!isOpen && 'justify-center'} ${isActive ? 'bg-green-900 text-white' : ''} ${classLogout}`}
    onClick={onClick}
  >
    <div className="text-xl cursor-pointer">{icon}</div>
    {isOpen && <span className="ml-4">{text}</span>}
  </div>
);

export default Sidebar;
