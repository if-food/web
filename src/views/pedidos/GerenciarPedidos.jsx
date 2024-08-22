import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import successImage from "../../assets/Success Illustration.png";
import mastercardLogo from "../../assets/mastercard.png";
import Sidebar from '../../componentes/Sidebar';
import ordersData from '../../data/orders.json'; // Importe o JSON com os dados dos pedidos

function GerenciarPedidos() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(ordersData); // Estado para armazenar pedidos
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Função para lidar com o clique em um pedido
  const handleOrderClick = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    setSelectedOrder(order);
  };

  // Função para confirmar o pedido
  const confirmOrder = () => {
    if (selectedOrder) {
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id
          ? { ...order, status: 'Em preparo' }
          : order
      );
      setOrders(updatedOrders);
      setSelectedOrder(prev => ({ ...prev, status: 'Em preparo' }));
    }
  };

  // Função para cancelar o pedido
  const cancelOrder = () => {
    if (selectedOrder) {
      const updatedOrders = orders.filter(order => order.id !== selectedOrder.id);
      setOrders(updatedOrders);
      setSelectedOrder(null); // Limpar seleção após cancelamento
    }
  };

  // Função para despachar o pedido
  const dispatchOrder = () => {
    if (selectedOrder) {
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id
          ? { ...order, status: 'Concluídos' }
          : order
      );
      setOrders(updatedOrders);
      setSelectedOrder(prev => ({ ...prev, status: 'Concluídos' }));

      // Atualizar a lista de pedidos para a seção de concluídos
      const movedOrder = updatedOrders.find(order => order.id === selectedOrder.id);
      if (movedOrder) {
        setOrders(updatedOrders.filter(order => order.id !== selectedOrder.id).concat(movedOrder));
      }
    }
  };

  const deleteOrder = () => {
    if (selectedOrder) {
      const updatedOrders = orders.filter(order => order.id !== selectedOrder.id);
      setOrders(updatedOrders);
      setSelectedOrder(null); // Limpar seleção após exclusão
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-grow overflow-y-auto'>
        <Sidebar className='w-80 min-w-[20rem] flex-shrink-0' />
        <div className='flex flex-col flex-grow mt-5 mb-5'>
          {/* Conteúdo Principal */}
          <div className='relative flex flex-col bg-gray-100 flex-grow overflow-hidden rounded-xl'>
            <span className='w-full p-4 mb-10'>
              <input className='w-full input-underline bg-gray-100' placeholder='Busque pelo número do pedido' type="text" />
            </span>
            <div className='flex flex-col flex-grow overflow-hidden'>
              <div className='flex flex-col flex-grow overflow-y-auto'>
                {/* Seções de pedidos */}
                {['Pendente', 'Em preparo', 'Concluídos'].map(status => (
                  <div className='flex flex-col' key={status}>
                    <div className='flex justify-between items-center bg-gray-200 py-3 px-4'>
                      <span className='text-xl font-medium text-gray-500'>{status}</span>
                      <span className='text-xl font-medium text-gray-500'>{orders.filter(o => o.status === status).length}</span>
                    </div>
                    <div className='flex flex-col text-secondary'>
                      {orders.filter(o => o.status === status).map(order => (
                        <div
                          key={order.id}
                          className='cursor-pointer flex justify-between items-center py-3 px-4 hover:bg-gray-300 border-b-2'
                          onClick={() => handleOrderClick(order.id)}
                        >
                          <div className='flex flex-col justify-between'>
                            <span className='font-semibold'>{order.id}</span>
                            <span className='font-semibold'>{order.status === 'Pendente' ? 'Confirme o pedido' : 'Entregar até ' + order.deliveryTime}</span>
                          </div>
                          <button className={`bg-${order.status === 'Pendente' ? 'orange-500' : order.status === 'Em preparo' ? 'red-600' : 'secondary_1'} text-white py-0.5 px-5 w-fit h-fit rounded-full`}>
                            {order.time}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Conteúdo Adicional no Lado Direito */}
        <div className='flex flex-col w-9/12 mx-auto mt-3 p-5 gap-10 overflow-y-auto'>
          {selectedOrder ? (
            <>
              <div className='flex gap-8 w-full bg-white rounded-md px-8 py-5'>
                <img src={successImage} alt="Success" />
                <div className='flex flex-col gap-3'>
                  <span className='text-2xl text-secondary_1'>Confirme o pedido para começar a preparar</span>
                  <span className='text-secondary max-w-sm'>Confirme o pedido e o cliente será notificado que você está preparando</span>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-2xl text-secondary_3_variant'>Pedido {selectedOrder.id}</span>
                <div className='w-2 h-2 rounded-full bg-secondary_3'></div>
                <span className='text-2xl text-secondary_3_variant'>Feito às {selectedOrder.deliveryTime}</span>
              </div>
              <div className='flex gap-8 items-center w-full bg-white rounded-md px-8 py-5'>
                <span className='text-sm text-white py-2 px-4 bg-secondary_1 rounded-full font-semibold'>Entregar em</span>
                <div className='flex flex-col gap-3'>
                  <span className='text-secondary_1'>{selectedOrder.address}</span>
                </div>
              </div>
              <div className='flex flex-col w-full h-fit bg-white rounded-md'>
                <div className='bg-red-100 text-red-600 px-8 py-5 w-full rounded-t-md'>
                  <div className='flex flex-col justify-between'>
                    <span className='font-bold'>{selectedOrder.status}</span>
                    <span>{selectedOrder.time} minutos para confirmar</span>
                  </div>
                </div>
                <div className='flex flex-col'>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className='flex justify-between border-b-2 border-gray-300 px-8 py-5'>
                      <div className='flex gap-2'>
                        <span className='font-bold'>{index + 1}</span>
                        <span className='text-secondary'>{item.name}</span>
                      </div>
                      <span>{item.price}</span>
                    </div>
                  ))}
                  <div className='flex justify-between px-8 py-5'>
                    <span className='text-secondary font-bold'>Subtotal</span>
                    <span>{selectedOrder.subtotal}</span>
                  </div>
                </div>
              </div>
              <div className='flex gap-8 items-center w-full bg-white rounded-md px-8 py-5'>
                <img src={mastercardLogo} alt="Mastercard" />
                <div className='flex flex-col gap-1'>
                  <span className='text-secondary font-semibold'>{selectedOrder.paymentMethod}</span>
                  <span className='text-secondary'>O entregador não deve cobrar este valor no ato da entrega</span>
                </div>
              </div>
              <div className='flex gap-16 ml-auto mt-10'>
                {selectedOrder.status === 'Pendente' && (
                  <>
                    <button onClick={cancelOrder} className='flex items-center font-extrabold text-white text-2xl transition-opacity rounded-2xl px-24 p-3 border-2  bg-secondary_3 hover:bg-secondary_3_variant '>
                      Rejeitar
                    </button>
                    <button onClick={confirmOrder} className='flex items-center font-extrabold text-white text-2xl  transition-opacity rounded-2xl px-24 p-3 border-2  bg-secondary_1 hover:bg-secondary_2'>
                      Confirmar
                    </button>
                  </>
                )}
                {selectedOrder.status === 'Em preparo' && (
                  <button onClick={dispatchOrder} className='flex items-center font-extrabold text-white text-2xl transition-opacity rounded-2xl px-24 p-3 border-2 bg-secondary_1 hover:bg-secondary_2'>
                    Despachar
                  </button>
                )}
                {selectedOrder.status === 'Concluídos' && (
                  <button onClick={deleteOrder} className='flex items-center font-extrabold text-white text-2xl rounded-2xl transition-opacity px-24 p-3 border-2 bg-green-500 hover:bg-green-600'>
                    Finalizar
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center h-full'>
              <span className='text-xl text-gray-500'>Selecione um pedido para ver os detalhes</span>
            </div>
          )}
        </div>
      </div>
     
    </div>
  );
}

export default GerenciarPedidos;

