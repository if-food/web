// src/hooks/useOrderManagement.js
import { useState } from "react";
import ordersData from "../data/orders.json"; // Importe o JSON com os dados dos pedidos

const useOrderManagement = () => {
  const [orders, setOrders] = useState(ordersData); // Estado para armazenar pedidos
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Função para lidar com o clique em um pedido
  const handleOrderClick = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    setSelectedOrder(order);
  };

  const updateOrderStatus = (status) => {
    if (selectedOrder) {
      const updatedOrders = orders.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status }
          : order
      );
      setOrders(updatedOrders);
      setSelectedOrder((prev) => ({ ...prev, status }));
    }
  };

  const confirmOrder = () => updateOrderStatus("Em preparo");

  const cancelOrder = () => {
    if (selectedOrder) {
      const updatedOrders = orders.filter(
        (order) => order.id !== selectedOrder.id
      );
      setOrders(updatedOrders);
      setSelectedOrder(null);
    }
  };

  const dispatchOrder = () => updateOrderStatus("Concluídos");

  const deleteOrder = () => {
    if (selectedOrder) {
      const updatedOrders = orders.filter(
        (order) => order.id !== selectedOrder.id
      );
      setOrders(updatedOrders);
      setSelectedOrder(null);
    }
  };

  return {
    orders,
    selectedOrder,
    handleOrderClick,
    confirmOrder,
    cancelOrder,
    dispatchOrder,
    deleteOrder
  };
};

export default useOrderManagement;
