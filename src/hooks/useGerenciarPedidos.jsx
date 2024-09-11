import { useState, useEffect } from "react";
import axios from "axios";
import { getRestauranteId } from '../views/util/AuthenticationService';
import { toast } from 'react-toastify';

const useOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  }, [orders]);

  const handleOrderClick = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    setSelectedOrder(order);
  };

  const updateOrderStatus = async (body) => {
    if (selectedOrder) {
      try {
        const updatedOrder = { ...selectedOrder, ...body };
        await axios.put(`http://localhost:8080/api/pedido/${selectedOrder.id}`, body);
        const updatedOrders = orders.map((order) =>
          order.id === selectedOrder.id ? updatedOrder : order
        );
        setOrders(updatedOrders);
        setSelectedOrder((prev) => ({ ...prev, ...body }));
        toast.success(`Pedido atualizado com sucesso!`);
      } catch (err) {
        setError(err);
      }
    }
  };

  const confirmOrder = () => updateOrderStatus({ statusEntrega: "EM_PREPARO" });

  const cancelOrder = () => updateOrderStatus({ statusPgto: "CANCELADO", statusEntrega: "CANCELADO" });

  const dispatchOrder = () => updateOrderStatus({ statusEntrega: "EM_ROTA" });

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
  };
};

export default useOrderManagement;