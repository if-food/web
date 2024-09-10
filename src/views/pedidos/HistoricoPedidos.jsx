import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../componentes/ParceirosSidebar'; // Ajuste o caminho conforme a localização do arquivo
import { getRestauranteId } from '../util/AuthenticationService'; // Certifique-se de que o caminho está correto

const PesquisaPedidos = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orderId, setOrderId] = useState('');
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState('Todos');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [restauranteId, setRestauranteId] = useState(null);

  // Função para buscar pedidos da API
  const fetchOrders = useCallback(async () => {
    if (!restauranteId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/api/pedido/?restauranteId=${restauranteId}`);
      setOrders(response.data);
      filterOrders(response.data); // Filtra os dados após buscar
    } catch (err) {
      setError('Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  }, [restauranteId]);

  // Obtenha o restauranteId quando o componente for montado
  useEffect(() => {
    const id = getRestauranteId();
    setRestauranteId(id);
  }, []);

  // Função para filtrar pedidos com base nos critérios
  const filterOrders = (ordersData) => {
    let filteredData = [...ordersData]; // Cria uma cópia dos pedidos

    if (startDate) {
      filteredData = filteredData.filter(order => new Date(order.dataPedido) >= new Date(startDate));
    }

    if (endDate) {
      filteredData = filteredData.filter(order => new Date(order.dataPedido) <= new Date(endDate));
    }

    if (orderId) {
      const numericOrderId = Number(orderId);
      filteredData = filteredData.filter(order => order.id === numericOrderId);
    }

    if (deliveryStatusFilter !== 'Todos') {
      filteredData = filteredData.filter(order => order.statusEntrega === deliveryStatusFilter);
    }

    setFilteredOrders(filteredData);
  };

  // Função de busca e filtro ao clicar no botão
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!restauranteId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/api/pedido/?restauranteId=${restauranteId}`);
      setOrders(response.data);
      filterOrders(response.data); // Filtra os dados após buscar
    } catch (err) {
      setError('Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col m-8">
          <form onSubmit={handleSearch} className="flex flex-col">
            <div className="flex justify-around text-secondary_3_variant text-xl font-bold mb-8">
              <label className="flex flex-col items-center">
                Data Início:
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="text-center text-secondary_1 font-bold ml-2 rounded-2xl p-2"
                />
              </label>

              <label className="flex items-center flex-col ml-4">
                Data Fim:
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="text-center text-secondary_1 font-bold ml-2 rounded-2xl p-2"
                />
              </label>

              <label className="flex items-center flex-col ml-4">
                Status de Entrega:
                <select
                  value={deliveryStatusFilter}
                  onChange={(e) => setDeliveryStatusFilter(e.target.value)}
                  className="text-center text-secondary_1 font-bold ml-2 rounded-2xl p-2"
                >
                  <option value="Todos">Todos</option>
                  <option value="PENDENTE">Pendente</option>
                  <option value="ENTREGUE">Entregue</option>
                </select>
              </label>

              <label className="flex items-center flex-col ml-4">
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
              <button type="submit" className="ml-4 mb-4 flex items-center bg-secondary_1 h-10 text-white px-16 border-2 border-white rounded-2xl">
                {loading ? 'Carregando...' : 'Pesquisar'}
              </button>
            </div>
          </form>

          <div className="flex-1 text-center overflow-auto scrollbar-hidden">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="text-xl text-secondary_1 font-bold py-2 px-4 border-b border-b-secondary_3">Número</th>
                  <th className="text-xl text-secondary_1 font-bold py-2 px-4 border-b border-b-secondary_3">Status de Entrega</th>
                  <th className="text-xl text-secondary_1 font-bold py-2 px-4 border-b border-b-secondary_3">Data/Hora</th>
                  <th className="text-xl text-secondary_1 font-bold py-2 px-4 border-b border-b-secondary_3">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                       <td className="text-lg text-secondary_1 py-2 px-4 border-b border-b-secondary_3">{order.id}</td>
                       <td className="text-lg text-secondary_1 py-2 px-4 border-b border-b-secondary_3">{order.statusEntrega}</td>
                       <td className="text-lg text-secondary_1 py-2 px-4 border-b border-b-secondary_3">{order.dataPedido}</td>
                       <td className="text-lg text-secondary_1 py-2 px-4 border-b border-b-secondary_3">{order.valorTotal}</td>
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

