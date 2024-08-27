import { useState } from 'react';
import { FaDollarSign, FaHandshake, FaHome, FaInfoCircle, FaRegUser, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../views/util/AuthenticationService';

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout(); // Executa o logout
    navigate('/'); // Redireciona para a página inicial
  };

  return (
    <div className={`flex  ${isOpen ? 'w-64' : 'w-18'}  text-secondary_1 abs transition-width duration-300 mx-4 my-4`}>
      <div className="flex flex-col w-full border-2  rounded-2xl bg-white">
        <div className="flex flex-col justify-between border-2 border-secondary_1 h-full rounded-2xl">
        <div >
        <button
          onClick={toggleSidebar}
          className="p-2 text-2xl font-bold  hover:bg-secondary_2  w-full rounded-t-2xl"
        >
          {isOpen ? '<<' : '>>'}
        </button>
          <div>
          <Link to="/home-parceiros" className='visited:text-secondary_1'>
            <SidebarItem icon={<FaHome />} text="Home" isOpen={isOpen}  />
          </Link>
          <SidebarItem icon={<FaUsers />} text="Clientes" isOpen={isOpen} />
          <SidebarItem icon={<FaHandshake />} text="Parceiros" isOpen={isOpen} />
          <SidebarItem icon={<FaDollarSign />} text="Faturamento" isOpen={isOpen} />
          <Link to="/cadastro" className='visited:text-secondary_1'>
            <SidebarItem icon={<FaRegUser/>} text="Perfil" isOpen={isOpen} />
          </Link>
          <SidebarItem icon={<FaInfoCircle />} text="Informações" isOpen={isOpen} />
          </div>
        </div >
            <SidebarItem icon={<FaSignOutAlt />}
            onClick={handleLogout}
            text="Logout"
            isOpen={isOpen} />
          
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, isOpen, onClick }) => (
  <div
    className={`flex items-center p-4 hover:bg-secondary_2 cursor-pointer ${!isOpen && 'justify-center'}`}
    onClick={onClick} // Adicione onClick aqui para o item de logout
  >
    <div className="text-xl cursor-pointer">{icon}</div>
    {isOpen && <span className="ml-4">{text}</span>}
  </div>
);

export default Sidebar;
