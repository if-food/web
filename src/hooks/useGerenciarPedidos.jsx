import { useState, useEffect } from "react";
import axios from "axios";
import { getRestauranteId } from '../views/util/AuthenticationService';
import { toast } from 'react-toastify'; // Importar toastify

const useOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restauranteId, setRestauranteId] = useState('');

  useEffect(() => {
    const restauranteId = getRestauranteId();
    
    const fetchOrders = async () => {
      if (!restauranteId) return;

      try {
        const response = await axios.get(`http://localhost:8080/api/pedido/?restauranteId=${restauranteId}`);
        const newOrders = response.data;

        // Verifica se há novos pedidos e exibe uma notificação
        newOrders.forEach(order => {
          if (order.statusEntrega === 'PENDENTE' && !orders.some(o => o.id === order.id)) {
            toast.info(`Novo pedido recebido: ${order.id}`);
          }
        });

        setOrders(newOrders);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders(); // Fetch orders initially

    // Define o intervalo de polling (por exemplo, a cada 30 segundos)
    const intervalId = setInterval(fetchOrders, 30000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);

  }, [restauranteId, orders]);

  const handleOrderClick = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    setSelectedOrder(order);
  };

  const updateOrderStatus = async (status) => {
    if (selectedOrder) {
      try {
        const updatedOrder = { ...selectedOrder, status };
        await axios.put(`http://localhost:8080/api/pedido/${selectedOrder.id}`, updatedOrder);
        const updatedOrders = orders.map((order) =>
          order.id === selectedOrder.id ? updatedOrder : order
        );
        setOrders(updatedOrders);
        setSelectedOrder((prev) => ({ ...prev, status }));
        toast.success(`Pedido ${status} com sucesso!`);
      } catch (err) {
        setError(err);
      }
    }
  };

  const confirmOrder = () => updateOrderStatus("EM PREPARO");

  const cancelOrder = async () => {
    if (selectedOrder) {
      try {
        await axios.delete(`http://localhost:8080/api/pedido/${selectedOrder.id}`);
        const updatedOrders = orders.filter((order) => order.id !== selectedOrder.id);
        setOrders(updatedOrders);
        setSelectedOrder(null);
        toast.error(`Pedido ${selectedOrder.id} cancelado.`);
      } catch (err) {
        setError(err);
      }
    }
  };

  const dispatchOrder = () => updateOrderStatus("CONCLUÍDO");

  const deleteOrder = async () => {
    if (selectedOrder) {
      try {
        await axios.delete(`http://localhost:8080/api/pedido/${selectedOrder.id}`);
        const updatedOrders = orders.filter((order) => order.id !== selectedOrder.id);
        setOrders(updatedOrders);
        setSelectedOrder(null);
        toast.info(`Pedido ${selectedOrder.id} finalizado.`);
      } catch (err) {
        setError(err);
      }
    }
  };

  return {
    orders,
    selectedOrder,
    handleOrderClick,
    confirmOrder,
    cancelOrder,
    dispatchOrder,
    deleteOrder,
    loading,
    error,
    restauranteId,
  };
};

export default useOrderManagement;
