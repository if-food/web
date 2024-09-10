import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Certifique-se de que o CSS do Toastify está importado
import successImage from '../../assets/Success Illustration.png';
import mastercardLogo from '../../assets/mastercard.png';
import Sidebar from '../../componentes/ParceirosSidebar';
import useOrderManagement from '../../hooks/useGerenciarPedidos';

const GerenciarPedidos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { orders, selectedOrder, handleOrderClick, confirmOrder, cancelOrder, dispatchOrder, deleteOrder, loading, error } = useOrderManagement();

  const filteredOrders = orders.filter(order =>
    String(order.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar pedidos: {error.message}</div>;

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer /> {/* ToastContainer deve ser incluído aqui */}
      <div className="flex flex-grow overflow-y-auto">
        <Sidebar className="w-80 min-w-[20rem] flex-shrink-0" />
        <div className="flex flex-col flex-grow mt-5 mb-5">
          <div className="relative flex flex-col bg-gray-100 flex-grow overflow-hidden rounded-xl">
            <span className="w-full p-4 mb-10">
              <input
                className="w-full input-underline bg-gray-100"
                placeholder="Busque pelo número do pedido"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </span>
            <div className="flex flex-col flex-grow overflow-hidden">
              <div className="flex flex-col flex-grow overflow-y-auto">
                {["PENDENTE", "EM PREPARO", "CONCLUÍDO"].map((status) => (
                  <div className="flex flex-col" key={status}>
                    <div className="flex justify-between items-center bg-gray-300 py-3 px-4">
                      <span className="text-xl font-bold text-secondary_1">
                        {status}
                      </span>
                      <span className="text-xl font-bold text-secondary_1">
                        {filteredOrders.filter((o) => o.statusEntrega === status).length}
                      </span>
                    </div>
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
                              <span className="font-semibold">{order.id}</span>
                              <span className="font-semibold">
                                {order.statusEntrega === "PENDENTE"
                                  ? "Confirme o pedido"
                                  : "Entregar até " + order.deliveryTime}
                              </span>
                            </div>
                            <button
                              className={`${
                                order.statusEntrega === "PENDENTE"
                                  ? "bg-atention_02"
                                  : order.statusEntrega === "EM PREPARO"
                                  ? "bg-orange-500"
                                  : "bg-secondary_2"
                              } text-white py-0.5 px-5 w-fit h-fit rounded-full`}
                            >
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
        <div className="flex flex-col w-9/12 mx-auto mt-3 p-5 gap-10 overflow-y-auto">
          {selectedOrder ? (
            <>
              <div className="flex gap-8 w-full bg-white rounded-md px-8 py-5">
                <img src={successImage} alt="Success" className="max-w-full h-auto" /> {/* Ajuste de tamanho */}
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
                  Feito às {selectedOrder.time}
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
                  className={`${
                    selectedOrder.statusEntrega === "PENDENTE"
                      ? "bg-red-300 text-secondary_1 border-b-2 border-secondary_3"
                      : selectedOrder.statusEntrega === "EM PREPARO"
                      ? "bg-orange-300 text-secondary_1 border-b-2 border-secondary_3"
                      : "bg-green-300 text-secondary_1 border-b-2 border-secondary_3"
                  } flex justify-between px-8 py-5`}
                >
                  <div className="flex flex-col">
                    <span className="font-extrabold text-xl">{selectedOrder.statusEntrega}</span>
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
                        <span className="font-bold">{index + 1}</span>
                        <span className="text-secondary">{item.produto.titulo}</span>
                      </div>
                      <span>{item.precoUnitario}</span>
                    </div>
                  ))}
                  <div className="flex justify-between px-8 py-5">
                    <span className="text-secondary text-xl font-extrabold">Subtotal</span>
                    <span className="text-xl text-atention_02 font-bold">{selectedOrder.valorTotal}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 items-center w-full bg-white rounded-md px-8 py-5">
                <img src={mastercardLogo} alt="Mastercard" className="max-w-full h-auto" /> {/* Ajuste de tamanho */}
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
                {selectedOrder.statusEntrega === "EM PREPARO" && (
                  <button
                    onClick={dispatchOrder}
                    className="flex items-center font-extrabold text-white text-2xl transition-opacity rounded-2xl px-24 p-3 border-2 bg-secondary_1 hover:bg-secondary_2"
                  >
                    Despachar
                  </button>
                )}
                {selectedOrder.statusEntrega === "CONCLUÍDO" && (
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
