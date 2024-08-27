import React, { useEffect, useState } from 'react';
import { FaChartLine } from 'react-icons/fa';
import { IoMdRestaurant } from 'react-icons/io';
import { Link } from 'react-router-dom';
import '../../../src/index.css';
import gerencieCardapio from '../../assets/gerencieCardapio.png';
import gerenciePedidos from '../../assets/gerenciePedidos.png';
import logo from '../../assets/iffood.png'; 
import Sidebar from '../../componentes/ParceirosSidebar';
import orders from '../../data/orders.json'; // Supondo que o JSON esteja nessa localização

const HomeParceiros = () => {
    const [totalPedidos, setTotalPedidos] = useState(0);
    const [ticketMedio, setTicketMedio] = useState('R$ 0,00');
    const [totalVendas, setTotalVendas] = useState(0);
    const [valorTotal, setValorTotal] = useState('R$ 0,00');

    useEffect(() => {
        const totalPedidos = orders.length;

        const valorTotal = orders.reduce((acc, order) => {
            return acc + parseFloat(order.subtotal.replace('R$ ', '').replace(',', '.'));
        }, 0);

        const totalItensVendidos = orders.reduce((acc, order) => {
            return acc + order.items.length;
        }, 0);

        const ticketMedio = valorTotal / totalPedidos;

        setTotalPedidos(totalPedidos);
        setTicketMedio(`R$ ${ticketMedio.toFixed(2).replace('.', ',')}`);
        setTotalVendas(totalItensVendidos);
        setValorTotal(`R$ ${valorTotal.toFixed(2).replace('.', ',')}`);
    }, []);

    // Definição dos dados dos cards
    const cardsData = [
        {
            id: 1,
            label: '',
            image: gerencieCardapio,
            link: '/cardapio',
            highlight: true,
        },
        {
            id: 2,
            label: '',
            image: gerenciePedidos,
            link: '/gerenciar-pedidos',
            highlight: true,
        },
        // Adicione mais cards conforme necessário
    ];

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <div className="flex-1 flex flex-col overflow-y-auto">
                    <div className="bg-blue-600 text-white h-48 flex items-center justify-center text-2xl font-bold mr-10 ml-5 my-4 rounded-2xl">
                        Banner da Loja
                    </div>

                    <div className="flex-1 p-6 overflow-auto">
                        <div className="flex items-center mb-4">
                            <IoMdRestaurant className="text-4xl text-secondary_2" />
                            <h1 className="text-3xl text-white font-bold ml-4">Bem-vindo, Usuário</h1>
                        </div>

                        <div className="flex flex-col bg-white p-6 rounded-lg w-full mb-4 text-secondary_1">
                            <div className="flex items-center mb-4">
                                <img src={logo} alt="Logo da Loja" className="w-36" />
                                <div className="ml-4 flex flex-col flex-grow">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">Nome da Loja</h2>
                                        <p className="text-secondary_3">Acompanhamento</p>
                                        <p className="text-atention_02">Fechar Agora</p>
                                    </div>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="flex flex-col items-center w-full lg:w-1/3 mb-4">
                                            <div className="flex items-center mb-4">
                                                <FaChartLine className="text-2xl text-secondary_1 mr-4" />
                                                <h2 className="text-xl font-bold">Desempenho</h2>
                                            </div>
                                            <div className="flex justify-between w-full">
                                                <div className="flex flex-col mr-8">
                                                    <h3 className="text-lg font-bold text-secondary_2">Pedidos de Hoje</h3>
                                                    <p className="text-2xl">{totalPedidos} pedidos</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="text-lg font-bold text-secondary_2">Ticket Médio</h3>
                                                    <p className="text-2xl">{ticketMedio}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center w-full lg:w-1/3 mb-4">
                                            <div className="flex items-center mb-4">
                                                <FaChartLine className="text-2xl text-secondary_1 mr-4" />
                                                <h2 className="text-xl font-bold">Vendas</h2>
                                            </div>
                                            <div className="flex justify-between w-full">
                                                <div className="flex flex-col mr-8">
                                                    <h3 className="text-lg font-bold text-secondary_2">Total de Vendas</h3>
                                                    <p className="text-2xl">{totalVendas}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="text-lg font-bold text-secondary_2">Valor Total</h3>
                                                    <p className="text-2xl">{valorTotal}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex h-80 justify-center text-secondary1">
                            {cardsData.map((card) => (
                                <div key={card.id} className="flex justify-center items-center">
                                    <div className="relative flex justify-center">
                                        <Link to={card.link} className="relative block">
                                            <img className="w-5/6" src={card.image} alt={card.label} />
                                            {card.highlight && <span>{card.label}</span>}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-gradient-to-t from-[#1F2026] via-[#1c1918] to-[#37383F] text-secondary_3_variant py-4 text-center">
                <p>&copy; 2024 Seu Restaurante. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default HomeParceiros;
