import { useState, useEffect } from "react";
import axios from "axios";
import { getRestauranteId } from '../views/util/AuthenticationService';

const useOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restauranteId, setRestauranteId] = useState('');
 

  useEffect(() => {
    const restauranteId= getRestauranteId();
    
    

    const fetchOrders = async () => {
      if (restauranteId == null) return; // Não faz a solicitação se restauranteId não estiver definido

      try {
        const response = await axios.get(`http://localhost:8080/api/pedido/?restauranteId=${restauranteId}`);
        setOrders(response.data);
        console.log(restauranteId)
        console.log(response.data)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [restauranteId]);

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
