import { useState } from 'react';
import { FaHome, FaUsers, FaHandshake, FaDollarSign, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`flex ${isOpen ? 'w-64' : 'w-18'}  h-screen bg-white text-[#1C4F2A] transition-width duration-300`}>
      <div className="flex flex-col w-full">
        <button
          onClick={toggleSidebar}
          className="p-4 text-2xl font-bold  hover:bg-white-600"
        >
          {isOpen ? '<<' : '>>'}
        </button>
        <div className="flex flex-col mt-4">
          <SidebarItem icon={<FaHome />} text="Home" isOpen={isOpen} />
          <SidebarItem icon={<FaUsers />} text="Clientes" isOpen={isOpen} />
          <SidebarItem icon={<FaHandshake />} text="Parceiros" isOpen={isOpen} />
          <SidebarItem icon={<FaDollarSign />} text="Faturamento" isOpen={isOpen} />
          <SidebarItem icon={<FaInfoCircle />} text="Informações" isOpen={isOpen} />
          <SidebarItem icon={<FaSignOutAlt />} text="Logout" isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, isOpen }) => (
  <div className={`flex items-center p-4 hover:bg-gray-200 ${!isOpen && 'justify-center'}`}>
    <div className="text-xl">{icon}</div>
    {isOpen && <span className="ml-4">{text}</span>}
  </div>
);

export default Sidebar;
