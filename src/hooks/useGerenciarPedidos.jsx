import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getRestauranteId } from '../views/util/AuthenticationService';
import { toast } from 'react-toastify';

const useOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initialLoad = useRef(true); // Track initial load
  const previousOrders = useRef([]); // Store previous orders

  useEffect(() => {
    const restauranteId = getRestauranteId();
    
    const fetchOrders = async () => {
      if (!restauranteId) return;

      try {
        const response = await axios.get(`http://localhost:8080/api/pedido/?restauranteId=${restauranteId}`);
        const newOrders = response.data;

        // Verifica se há novos pedidos e exibe uma notificação apenas após o carregamento inicial
        if (!initialLoad.current) {
          newOrders.forEach(order => {
            if (order.statusEntrega === 'PENDENTE' && !previousOrders.current.some(o => o.id === order.id)) {
              toast.info(`Novo pedido recebido: ${order.id}`);
            }
          });
        }

        setOrders(newOrders);
        previousOrders.current = newOrders; // Update previous orders
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
        initialLoad.current = false; // Set initial load to false after the first fetch
      }
    };

    fetchOrders(); // Fetch orders initially

    // Define o intervalo de polling (por exemplo, a cada 30 segundos)
    const intervalId = setInterval(fetchOrders, 30000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);

  }, []); // Remove `orders` from dependency array

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