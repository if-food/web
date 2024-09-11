import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import successImage from '../../assets/Success Illustration.png';
import mastercardLogo from '../../assets/mastercard.png';
import Sidebar from '../../componentes/ParceirosSidebar';
import useOrderManagement from '../../hooks/useGerenciarPedidos';

const GerenciarPedidos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { orders, selectedOrder, handleOrderClick, confirmOrder, cancelOrder, dispatchOrder, deleteOrder, loading, error } = useOrderManagement();
  const [visibleSections, setVisibleSections] = useState({
    PENDENTE: true,
    EM_PREPARO: true,
    CONCLUÍDO: true,
  });

  const toggleSectionVisibility = (status) => {
    setVisibleSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const filteredOrders = orders.filter(order =>
    String(order.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar pedidos: {error.message}</div>;

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      <div className="flex flex-grow overflow-y-auto">
        <Sidebar className="w-80 min-w-[20rem] flex-shrink-0" />
        <div className="flex flex-col flex-grow mt-5 mb-5">
          <div className="relative flex flex-col bg-gray-100 flex-grow overflow-hidden rounded-xl">
            <span className="w-full p-4 mb-10">
              <div className="relative">
                <input
                  className="w-full h-12 p-3 pl-10 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="número do pedido"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </span>
            <div className="flex flex-col flex-grow overflow-hidden">
              <div className="flex flex-col flex-grow overflow-y-auto">
                {["PENDENTE", "EM_PREPARO", "ENTREGUE"].map((status) => (
                  <div className="flex flex-col" key={status}>
                    <div className="flex justify-between items-center bg-gray-300 py-3 px-4">
                      <span className="text-xl font-bold text-secondary_1">
                        {status === "ENTREGUE" ? "Concluído" : status.replace('_', ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                      </span>
                      <span className="text-xl font-bold text-secondary_1">
                        {filteredOrders.filter((o) => o.statusEntrega === status).length}
                      </span>
                      <button
                        onClick={() => toggleSectionVisibility(status)}
                        className="text-xl font-bold text-secondary_1"
                      >
                        {visibleSections[status] ? '-' : '+'}
                      </button>
                    </div>
                    {visibleSections[status] && (
                      <div className="flex flex-col text-secondary_1">
                        {filteredOrders
                          .filter((o) => o.statusEntrega === status)
                          .map((order) => (
                            <div
                              key={order.id}
                              className="cursor-pointer flex justify-between items-center py-3 px-4 border-b-2 border-secondary_3 hover:bg-secondary_2"
                              onClick={() => handleOrderClick(order.id)}
                            >
                              <div className="flex flex-col justify-between">
                                <span className="font-semibold">N {order.id}º</span>
                                <span className="font-semibold text-sm">
                                  {order.statusEntrega === "PENDENTE"
                                    ? "Confirme o pedido"
                                    : (() => {
                                      const currentTime = new Date();
                                      const orderTime = order.dataDoPedido ? new Date(order.dataDoPedido) : null;
                                      if (!orderTime) {
                                        return "";
                                      }
                                      const displayTime = new Date(orderTime);
                                      displayTime.setMinutes(displayTime.getMinutes() + 40);
                                      return "Entregar até " + displayTime.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + " " + displayTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                                    })()
                                  }
                                </span>
                              </div>
                              <button
                                className={`${order.statusEntrega === "PENDENTE"
                                  ? "bg-atention_02"
                                  : order.statusEntrega === "EM_PREPARO"
                                    ? "bg-orange-500"
                                    : "bg-secondary_2"
                                  } text-white py-0.5 px-5 w-fit h-fit rounded-full`}
                              >
                                {order.time}
                              </button>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-9/12 mx-auto mt-3 p-5 gap-10 overflow-y-auto">
          {selectedOrder ? (
            <>
              <div className="flex gap-8 w-full bg-white rounded-md px-8 py-5">
                <img src={successImage} alt="Success" className="max-w-full h-auto" />
                <div className="flex flex-col gap-3">
                  <span className="text-2xl text-secondary_1">
                    Confirme o pedido para começar a preparar
                  </span>
                  <span className="text-secondary max-w-xl">
                    Confirme o pedido e o cliente será notificado que você está preparando
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl text-secondary_3_variant">
                  Pedido {selectedOrder.id}
                </span>
                <div className="w-2 h-2 rounded-full bg-secondary_3"></div>
                <span className="text-2xl text-secondary_3_variant">
                  {selectedOrder.dataDoPedido ? `Feito em ` + new Date(selectedOrder.dataDoPedido).toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : 'Data de realização não informada'}
                </span>
              </div>
              <div className="flex gap-8 items-center w-full bg-white rounded-md px-8 py-5">
                <span className="text-sm text-white py-2 px-4 bg-secondary_1 rounded-full font-semibold">
                  Entregar em
                </span>
                <div className="flex flex-col gap-3">
                  <span className="text-secondary_1">
                    {selectedOrder.address}
                  </span>
                </div>
              </div>
              <div className="flex text-secondary_1 flex-col w-full h-fit bg-white rounded-md">
                <div
                  className={`${selectedOrder.statusEntrega === "PENDENTE"
                    ? "bg-red-300 text-secondary_1 border-b-2 border-secondary_3"
                    : selectedOrder.statusEntrega === "EM_PREPARO"
                      ? "bg-orange-300 text-secondary_1 border-b-2 border-secondary_3"
                      : selectedOrder.statusEntrega === "CANCELADO"
                        ? "bg-red-300 text-secondary_1 border-b-2 border-secondary_3"
                        : "bg-green-300 text-secondary_1 border-b-2 border-secondary_3"
                    } flex justify-between px-8 py-5`}
                >
                  <div className="flex flex-col">
                    <span className="font-extrabold text-xl">{selectedOrder.statusEntrega.replace('_', ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}</span>
                    <span>{selectedOrder.time} minutos para confirmar</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  {selectedOrder.itens.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b-2 border-secondary_3 px-8 py-5"
                    >
                      <div className="flex gap-2">
                        <span className="font-bold">Item {index + 1}</span>
                        <span className="text-secondary">{item.produto.titulo}x</span>
                        <span className="text-secondary">{item.quantidade}x</span>
                      </div>
                      <span>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.precoUnitario)}
                      </span>
                      <span>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.subtotal)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between px-8 py-5">
                    <span className="text-secondary text-xl font-extrabold">Valor total</span>
                    <span className="text-xl text-atention_02 font-bold">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedOrder.valorTotal)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 items-center w-full bg-white rounded-md px-8 py-5">
                <img src={mastercardLogo} alt="Mastercard" className="max-w-full h-auto" />
                <div className="flex flex-col gap-1">
                  <span className="text-secondary font-semibold">
                    {selectedOrder.metodoPagamento}
                  </span>
                  <span className="text-secondary">
                    O entregador não deve cobrar este valor no ato da entrega
                  </span>
                </div>
              </div>
              <div className="flex gap-16 ml-auto mt-10">
                {selectedOrder.statusEntrega === "PENDENTE" && (
                  <>
                    <button
                      onClick={cancelOrder}
                      className="flex items-center font-extrabold text-white text-2xl transition-opacity rounded-2xl px-24 p-3 border-2 bg-secondary_3 hover:bg-secondary_3_variant"
                    >
                      Rejeitar
                    </button>
                    <button
                      onClick={confirmOrder}
                      className="flex items-center font-extrabold text-white text-2xl transition-opacity rounded-2xl px-24 p-3 border-2 bg-secondary_1 hover:bg-secondary_2"
                    >
                      Confirmar
                    </button>
                  </>
                )}
                {selectedOrder.statusEntrega === "EM_PREPARO" && (
                  <button
                    onClick={dispatchOrder}
                    className="flex items-center font-extrabold text-white text-2xl transition-opacity rounded-2xl px-24 p-3 border-2 bg-secondary_1 hover:bg-secondary_2"
                  >
                    Despachar
                  </button>
                )}
                {selectedOrder.statusEntrega === "ENTREGUE" && (
                  <button
                    onClick={deleteOrder}
                    className="flex items-center font-extrabold text-white text-2xl rounded-2xl transition-opacity px-24 p-3 border-2 bg-secondary_1 hover:bg-secondary_2"
                  >
                    Finalizar
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-3xl text-secondary_3_variant">
                Selecione um pedido para ver os detalhes
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GerenciarPedidos;