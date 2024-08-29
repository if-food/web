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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 "> {/* Ajuste o margin-left conforme a largura da sidebar */}
        <div className="mb-4">
          <label>
            Data Início:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="ml-2"
            />
          </label>
          <label className="ml-4">
            Data Fim:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="ml-2"
            />
          </label>
          <label className="ml-4">
            Código do Pedido:
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="ml-2"
            />
          </label>
          <label className="ml-4">
            Status:
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="ml-2"
            >
              <option value="Todos">Todos</option>
              <option value="Pendente">Pendente</option>
              <option value="Em preparo">Em preparo</option>
              <option value="Concluídos">Concluídos</option>
            </select>
          </label>
          <button onClick={handleSearch} className="ml-4 bg-blue-500 text-white py-2 px-4 rounded">
            Pesquisar
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Número</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Data/Hora</th>
              <th className="py-2 px-4 border-b">Valor</th>
            </tr>
          </thead>
          <tbody>
            {results.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">{`${order.orderDate} ${order.orderTime}`}</td>
                <td className="py-2 px-4 border-b">{order.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PesquisaPedidos;
