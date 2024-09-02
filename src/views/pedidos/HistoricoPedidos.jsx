import React, { useState } from 'react';
import Sidebar from '../../componentes/ParceirosSidebar'; // Ajuste o caminho conforme a localização do arquivo
import data from '../../data/orders.json'; // Certifique-se de que o caminho está correto

const PesquisaPedidos = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orderId, setOrderId] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    let filteredData = data;

    if (startDate) {
      filteredData = filteredData.filter(order => new Date(order.orderDate) >= new Date(startDate));
    }

    if (endDate) {
      filteredData = filteredData.filter(order => new Date(order.orderDate) <= new Date(endDate));
    }

    if (orderId) {
      filteredData = filteredData.filter(order => order.id.includes(orderId));
    }

    if (statusFilter !== 'Todos') {
      filteredData = filteredData.filter(order => order.status === statusFilter);
    }

    setResults(filteredData);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col m-8 ">
          <div className="flex justify-around text-secondary_3_variant text-xl font-bold mb-8">
            <label className="flex flex-col">
              Data Início:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-center text-secondary_1 font-bold ml-2 rounded-2xl p-2"
              />
            </label>

            <label className="flex flex-col ml-4">
              Data Fim:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-center text-secondary_1 font-bold ml-2 rounded-2xl p-2"
              />
            </label>

            <label className="flex flex-col ml-4">
              Status:
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-center text-secondary_1 font-bold ml-2 rounded-2xl p-2"
              >
                <option value="Todos">Todos</option>
                <option value="Pendente">Pendente</option>
                <option value="Em preparo">Em preparo</option>
                <option value="Concluídos">Concluídos</option>
              </select>
            </label>

            <label className="flex flex-col ml-4">
              Código do Pedido:
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="text-center text-secondary_1 font-bold ml-2 rounded-2xl p-2"
              />
            </label>
          </div>

          <div className="flex justify-center text-secondary_3_variant text-xl font-bold mb-4">
            <button onClick={handleSearch} className="ml-4 mb-4 flex items-center bg-secondary_1 h-10 text-white px-16 border-2 border-white rounded-2xl">
              Pesquisar
            </button>
          </div>

          <div className="flex-1 text-center overflow-auto scrollbar-hidden ">
            <table className="min-w-full bg-white  ">
              <thead className="bg-gray-100 sticky top-0 z-10 ">
                <tr>
                  <th className="text-xl text-secondary_1 font-bold py-2 px-4 border-b border-b-secondary_3">Número</th>
                  <th className="text-xl text-secondary_1 font-bold py-2 px-4 border-b border-b-secondary_3">Status</th>
                  <th className="text-xl text-secondary_1 font-bold py-2 px-4 border-b border-b-secondary_3">Data/Hora</th>
                  <th className="text-xl text-secondary_1 font-bold py-2 px-4 border-b border-b-secondary_3">Valor</th>
                </tr>
              </thead>
              <tbody>
                {results.map((order) => (
                  <tr key={order.id}>
                    <td className="text-lg text-secondary_1 py-2 px-4 border-b border-b-secondary_3">{order.id}</td>
                    <td className="text-lg text-secondary_1 py-2 px-4 border-b border-b-secondary_3">{order.status}</td>
                    <td className="text-lg text-secondary_1 py-2 px-4 border-b border-b-secondary_3">{`${order.orderDate} ${order.orderTime}`}</td>
                    <td className="text-lg text-secondary_1 py-2 px-4 border-b border-b-secondary_3">{order.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer className="bg-gradient-to-t from-[#1F2026] via-[#1c1918] to-[#37383F] text-secondary_3_variant py-4 text-center">
        <p>&copy; 2024 Seu Restaurante. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default PesquisaPedidos;
