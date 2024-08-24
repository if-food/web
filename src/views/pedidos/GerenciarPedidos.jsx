import React from "react";
import { useNavigate } from "react-router-dom";
import successImage from "../../assets/Success Illustration.png";
import mastercardLogo from "../../assets/mastercard.png";
import Sidebar from "../../componentes/Sidebar";

import useOrderManagement from "../../hooks/useGerenciarPedidos"; // Importe o custom hook

const GerenciarPedidos = () => {

  const navigate = useNavigate();
  
  const {
    orders,
    selectedOrder,
    handleOrderClick,
    confirmOrder,
    cancelOrder,
    dispatchOrder,
    deleteOrder
  } = useOrderManagement(); // Use o custom hook

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow overflow-y-auto">
        <Sidebar className="w-80 min-w-[20rem] flex-shrink-0" />
        <div className="flex flex-col flex-grow mt-5 mb-5">
          {/* Conteúdo Principal */}
          <div className="relative flex flex-col bg-gray-100 flex-grow overflow-hidden rounded-xl">
            <span className="w-full p-4 mb-10">
              <input
                className="w-full input-underline bg-gray-100"
                placeholder="Busque pelo número do pedido"
                type="text"
              />
            </span>
            <div className="flex flex-col flex-grow overflow-hidden">
              <div className="flex flex-col flex-grow overflow-y-auto">
                {/* Seções de pedidos */}
                {["Pendente", "Em preparo", "Concluídos"].map((status) => (
                  <div className="flex flex-col" key={status}>
                    <div className="flex justify-between items-center bg-gray-300  py-3 px-4">
                      <span className="text-xl font-bold text-secondary_1">
                        {status}
                      </span>
                      <span className="text-xl font-bold text-secondary_1 ">
                        {orders.filter((o) => o.status === status).length}
                      </span>
                    </div>
                    <div className="flex flex-col text-secondary_1">
                      {orders
                        .filter((o) => o.status === status)
                        .map((order) => (
                          <div
                            key={order.id}
                            className="cursor-pointer flex justify-between items-center py-3 px-4 border-b-2 border-secondary_3 hover:bg-secondary_2 "
                            onClick={() => handleOrderClick(order.id)}
                          >
                            <div className="flex flex-col justify-between">
                              <span className="font-semibold">{order.id}</span>
                              <span className="font-semibold">
                                {order.status === "Pendente"
                                  ? "Confirme o pedido"
                                  : "Entregar até " + order.deliveryTime}
                              </span>
                            </div>
                            <button
                              className={`${
                                order.status === "Pendente"
                                  ? "bg-atention_02"
                                  : order.status === "Em preparo"
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
        {/* Conteúdo Adicional no Lado Direito */}
      {}  <div className="flex flex-col w-9/12 mx-auto mt-3 p-5 gap-10 overflow-y-auto">
          {/*<div className="bg-blue-600 text-white min-h-48 flex items-center justify-center text-2xl font-bold rounded-2xl">
           Pedidos
          </div>*/}
          {selectedOrder ? (
            <>
              <div className="flex gap-8 w-full bg-white rounded-md px-8 py-5">
                <img src={successImage} alt="Success" />
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
                  Feito às {selectedOrder.deliveryTime}
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
              <div className="flex  text-secondary_1 flex-col w-full h-fit bg-white rounded-md">
                <div
                  className={`${
                    selectedOrder.status === "Pendente"
                      ? "bg-red-300 text-secondary_1 border-b-2 border-secondary_3"
                      : selectedOrder.status === "Em preparo"
                      ? "bg-orange-300 text-secondary_1 border-b-2 border-secondary_3"
                      : "bg-green-300 text-secondary_1 border-b-2 border-secondary_3"
                  } px-8 py-5 w-full rounded-t-md`}
                >
                  <div className="flex flex-col justify-between">
                    <span className="font-extrabold text-xl">{selectedOrder.status}</span>
                    <span>{selectedOrder.time} minutos para confirmar</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b-2 border-secondary_3 px-8 py-5"
                    >
                      <div className="flex gap-2">
                        <span className="font-bold">{index + 1}</span>
                        <span className="text-secondary">{item.name}</span>
                      </div>
                      <span>{item.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between px-8 py-5">
                    <span className="text-secondary text-xl font-extrabold">Subtotal</span>
                    <span className="text-xl text-atention_02 font-bold">{selectedOrder.subtotal}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 items-center w-full bg-white rounded-md px-8 py-5">
                <img src={mastercardLogo} alt="Mastercard" />
                <div className="flex flex-col gap-1">
                  <span className="text-secondary font-semibold">
                    {selectedOrder.paymentMethod}
                  </span>
                  <span className="text-secondary">
                    O entregador não deve cobrar este valor no ato da entrega
                  </span>
                </div>
              </div>
              <div className="flex gap-16 ml-auto mt-10">
                {selectedOrder.status === "Pendente" && (
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
                {selectedOrder.status === "Em preparo" && (
                  <button
                    onClick={dispatchOrder}
                    className="flex items-center font-extrabold text-white text-2xl transition-opacity rounded-2xl px-24 p-3 border-2 bg-secondary_1 hover:bg-secondary_2"
                  >
                    Despachar
                  </button>
                )}
                {selectedOrder.status === "Concluídos" && (
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
      <footer className="bg-gradient-to-t from-[#1F2026] via-[#1c1918] to-[#37383F] text-secondary_3_variant py-4 text-center">
        <p>&copy; 2024 Seu Restaurante. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default GerenciarPedidos;
