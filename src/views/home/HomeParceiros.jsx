import React, { useEffect, useState } from 'react';
import { FaChartLine, FaCalendarDay, FaDollarSign } from 'react-icons/fa';
import { IoMdRestaurant } from 'react-icons/io';
import { Link } from 'react-router-dom';
import '../../../src/index.css';
import gerencieCardapio from '../../assets/gerencieCardapio.png';
import gerenciePedidos from '../../assets/gerenciePedidos.png';
import logo from '../../assets/iffood.png'; 
import Sidebar from '../../componentes/ParceirosSidebar';
import orders from '../../data/orders.json'; 
import { getRestauranteNomeFantasia } from '../util/AuthenticationService';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, TimeScale, PointElement, LineElement } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Importando adaptador de data
import { format } from 'date-fns';

// Registro de todos os componentes necessários
ChartJS.register(BarElement, CategoryScale, LinearScale, TimeScale, Tooltip, Legend, PointElement, LineElement);

const cardsData = [
    {
        id: 1,
        image: gerencieCardapio,
        label: 'Gerencie Cardápio',
        link: "/cardapio",
    },
    {
        id: 2,
        image: gerenciePedidos,
        label: 'Gerencie Pedidos',
        link: "/gerenciar-pedidos",
    },
];

const convertDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
};

function HomeParceiros() {
    const [totalPedidos, setTotalPedidos] = useState(0);
    const [ticketMedio, setTicketMedio] = useState('R$ 0,00');
    const [totalVendas, setTotalVendas] = useState(0);
    const [valorTotal, setValorTotal] = useState('R$ 0,00');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        try {
            // Cálculos de total de pedidos, ticket médio, total de vendas e valor total
            const totalPedidos = orders.length;
            const valorTotal = orders.reduce((acc, order) => acc + parseFloat(order.subtotal.replace('R$ ', '').replace(',', '.')), 0);
            const totalItensVendidos = orders.reduce((acc, order) => acc + order.items.length, 0);
            const ticketMedio = valorTotal / totalPedidos;

            setTotalPedidos(totalPedidos);
            setTicketMedio(`R$ ${ticketMedio.toFixed(2).replace('.', ',')}`);
            setTotalVendas(totalItensVendidos);
            setValorTotal(`R$ ${valorTotal.toFixed(2).replace('.', ',')}`);

            // Dados para o gráfico
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - i);
                return date.toISOString().split('T')[0];
            }).reverse();

            const salesData = last7Days.map(date => {
                const dailyOrders = orders.filter(order => convertDate(order.orderDate) === date);
                const dailyTotal = dailyOrders.reduce((acc, order) => acc + parseFloat(order.subtotal.replace('R$ ', '').replace(',', '.')), 0);
                return dailyTotal;
            });

            const totalSalesData = last7Days.map(date => {
                const dailyOrders = orders.filter(order => convertDate(order.orderDate) === date);
                return dailyOrders.length;
            });

            setChartData({
                labels: last7Days,
                datasets: [
                    {
                        label: 'Valor Total de Vendas',
                        data: salesData,
                        backgroundColor: last7Days.map((_, index) => `hsl(${index * 360 / last7Days.length}, 70%, 60%)`),
                        borderColor: last7Days.map((_, index) => `hsl(${index * 360 / last7Days.length}, 70%, 50%)`),
                        borderWidth: 1,
                        barThickness: 30
                    },
                    /* {
                        label: 'Total de Vendas',
                        data: totalSalesData,
                        backgroundColor: last7Days.map((_, index) => `hsl(${(index + 4) * 360 / last7Days.length}, 70%, 60%)`),
                        borderColor: last7Days.map((_, index) => `hsl(${(index + 4) * 360 / last7Days.length}, 70%, 50%)`),
                        borderWidth: 1,
                    }, */
                ],
            });
        } catch (error) {
            console.error('Erro ao calcular os dados do gráfico:', error);
        }
    }, []);

    const [restauranteNomeFantasia, setRestauranteNomeFantasia] = useState('');

    useEffect(() => {
        const nomeFantasia = getRestauranteNomeFantasia();
        setRestauranteNomeFantasia(nomeFantasia);
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <div className="flex-1 flex flex-col overflow-y-auto p-6">
                    <div className="bg-blue-600 text-white h-48 flex items-center justify-center text-2xl font-bold rounded-2xl mb-6">
                        Banner da Loja
                    </div>

                    <div className="flex flex-col md:flex-row justify-between mb-6">
                        <div className="bg-white p-6 rounded-lg flex-1 mb-6 md:mb-0 mr-0 md:mr-4">
                            <div className="flex items-center mb-4">
                                <IoMdRestaurant className="text-4xl text-secondary_2" />
                                <h1 className="text-3xl text-white font-bold ml-4">Bem-vindo, {restauranteNomeFantasia}</h1>
                            </div>
                            <div className="flex flex-col mt-4">
                                <div className="flex items-center mb-4">
                                    <FaCalendarDay className="text-xl text-secondary_1 mr-4" />
                                    <p className="text-lg font-semibold">Pedidos de Hoje</p>
                                    <p className="text-2xl ml-4">{totalPedidos} pedidos</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <FaDollarSign className="text-xl text-secondary_1 mr-4" />
                                    <p className="text-lg font-semibold">Ticket Médio</p>
                                    <p className="text-2xl ml-4">{ticketMedio}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <FaDollarSign className="text-xl text-secondary_1 mr-4" />
                                    <p className="text-lg font-semibold">Total de Vendas</p>
                                    <p className="text-2xl ml-4">{totalVendas} itens</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <FaDollarSign className="text-xl text-secondary_1 mr-4" />
                                    <p className="text-lg font-semibold">Valor Total</p>
                                    <p className="text-2xl ml-4">{valorTotal}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg flex-1">
                            <div className="flex items-center mb-4">
                                <FaChartLine className="text-4xl text-secondary_2" />
                                <h2 className="text-3xl font-bold ml-4">Gráfico de Vendas</h2>
                            </div>
                            <div className="h-72">
                                <Line
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                display: true,
                                                labels: {
                                                    color: '#1C4F2A', // Cor do texto da legenda
                                                    boxWidth: 0, // Largura da caixa da legenda
                                                }
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function(tooltipItem) {
                                                        return `${tooltipItem.label}: R$ ${tooltipItem.raw.toFixed(2).replace('.', ',')}`;
                                                    }
                                                },
                                                titleColor: '#1C4F2A', // Cor do título do tooltip
                                                bodyColor: '#1C4F2A', // Cor do corpo do tooltip
                                                footerColor: '#1C4F2A', // Cor do rodapé do tooltip
                                            },
                                        },
                                        scales: {
                                            x: {
                                                type: 'time',
                                                time: {
                                                    unit: 'day',
                                                    tooltipFormat: 'dd/MM/yyyy',
                                                    displayFormats: {
                                                        day: 'dd/MM/yyyy'
                                                    }
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Data',
                                                    color: '#1C4F2A' // Cor do texto do título do eixo X
                                                },
                                                ticks: {
                                                    color: '#1C4F2A' // Cor dos valores do eixo X
                                                }
                                            },
                                            y: {
                                                title: {
                                                    display: true,
                                                    text: 'Valor',
                                                    color: '#1C4F2A' // Cor do texto do título do eixo Y
                                                },
                                                ticks: {
                                                    color: '#1C4F2A' // Cor dos valores do eixo Y
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg mb-6">
                        <div className="flex flex-wrap justify-between">
                            {cardsData.map((card) => (
                                <Link key={card.id} to={card.link} className="w-full sm:w-1/2 lg:w-1/3 mb-4">
                                    <div className="relative flex justify-center items-center">
                                        <img className="w-full rounded-lg shadow-lg" src={card.image} alt={card.label} />
                                        <span className="absolute bottom-2 left-2 bg-white text-black px-2 py-1 rounded-md">{card.label}</span>
                                    </div>
                                </Link>
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
