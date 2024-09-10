import React, { useEffect, useState } from "react";
import { FaChartLine, FaCalendarDay, FaDollarSign } from "react-icons/fa";
import { IoMdRestaurant } from "react-icons/io";
import { Link } from "react-router-dom";
import "../../../src/index.css";
import gerencieCardapio from "../../assets/gerencieCardapio.png";
import gerenciePedidos from "../../assets/gerenciePedidos.png";
import Sidebar from "../../componentes/ParceirosSidebar";
import { getRestauranteId, getRestauranteNomeFantasia } from "../util/AuthenticationService";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TimeScale,
  PointElement,
  LineElement,
} from "chart.js";
import "chartjs-adapter-date-fns";
import axios from 'axios';

// Registro de todos os componentes necessários
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const cardsData = [
  {
    id: 1,
    image: gerencieCardapio,
    label: "",
    link: "/cardapio",
  },
  {
    id: 2,
    image: gerenciePedidos,
    label: "",
    link: "/gerenciar-pedidos",
  },
];

const convertDate = (dateStr) => {
  if (!dateStr) return "";
  const parts = dateStr.split("/");
  if (parts.length !== 3) return "";
  const [day, month, year] = parts;
  return `${year}-${month}-${day}`;
};

function HomeParceiros() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [ticketMedio, setTicketMedio] = useState("R$ 0,00");
  const [totalVendas, setTotalVendas] = useState(0);
  const [valorTotal, setValorTotal] = useState("R$ 0,00");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [restauranteNomeFantasia, setRestauranteNomeFantasia] = useState("");

  const fetchData = async () => {
    try {
      const restauranteId = getRestauranteId();
      const response = await axios.get(`http://localhost:8080/api/pedido/?restauranteId=${restauranteId}`);
      const orders = response.data;

      if (!Array.isArray(orders)) {
        console.error("Dados da API não estão no formato esperado");
        return;
      }

      const totalPedidos = orders.length;
      const valorTotal = orders.reduce(
        (acc, order) => acc + (order.valorTotal || 0),
        0
      );
      const totalItensVendidos = orders.reduce(
        (acc, order) => acc + (order.itens ? order.itens.length : 0),
        0
      );
      const ticketMedio = totalPedidos > 0 ? valorTotal / totalPedidos : 0;

      setTotalPedidos(totalPedidos);
      setTicketMedio(`R$ ${ticketMedio.toFixed(2).replace(".", ",")}`);
      setTotalVendas(totalItensVendidos);
      setValorTotal(`R$ ${valorTotal.toFixed(2).replace(".", ",")}`);

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      }).reverse();

      const salesData = last7Days.map((date) => {
        const dailyOrders = orders.filter(
          (order) => convertDate(order.data) === date
        );
        const dailyTotal = dailyOrders.reduce(
          (acc, order) => acc + (order.valorTotal || 0),
          0
        );
        return dailyTotal;
      });

      setChartData({
        labels: last7Days,
        datasets: [
          {
            label: "Valor Total de Vendas",
            data: salesData,
            backgroundColor: last7Days.map(
              (_, index) => `hsl(${(index * 360) / last7Days.length}, 70%, 60%)`
            ),
            borderColor: last7Days.map(
              (_, index) => `hsl(${(index * 360) / last7Days.length}, 70%, 50%)`
            ),
            borderWidth: 1,
            barThickness: 30,
          },
        ],
      });
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);

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

          <div className="flex  md:flex-row justify-between mb-6">
            <div className="bg-white p-6 rounded-lg flex-1 mb-6 md:mb-0 mr-0 md:mr-4">
              <div className="flex items-center mb-4">
                <IoMdRestaurant className="text-4xl text-secondary_2" />
                <h1 className="text-3xl text-secondary_1 font-bold ml-4">
                  Bem-vindo, {restauranteNomeFantasia}
                </h1>
              </div>
              <div className="flex justify-around flex-row mb-10 mt-10">
                <div className="flex flex-col items-center mr-8">
                  <div className="flex items-center">
                    <FaCalendarDay className="text-2xl text-secondary_1 mr-4" />
                    <p className="text-2xl text-secondary_1 font-extrabold">Pedidos de Hoje</p>
                  </div>
                  <p className="text-2xl text-secondary_2 font-bold mt-2">{totalPedidos} pedidos</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <FaDollarSign className="text-2xl text-secondary_1 mr-4" />
                    <p className="text-2xl font-extrabold text-secondary_1">Ticket Médio</p>
                  </div>
                  <p className="text-2xl text-secondary_2 font-bold mt-2">{ticketMedio}</p>
                </div>
              </div>

              <div className="flex justify-around flex-row mb-4">
                <div className="flex flex-col items-center mr-8">
                  <div className="flex items-center">
                    <FaDollarSign className="text-2xl text-secondary_1 mr-4" />
                    <p className="text-2xl text-secondary_1 font-extrabold">Total de Vendas</p>
                  </div>
                  <p className="text-2xl text-secondary_2 font-bold mt-2">{totalVendas} itens</p>
                </div>
                <div className="flex flex-col items-center mr-8">
                  <div className="flex items-center">
                    <FaChartLine className="text-2xl text-secondary_1 mr-4" />
                    <p className="text-2xl text-secondary_1 font-extrabold">Valor Total</p>
                  </div>
                  <p className="text-2xl text-secondary_2 font-bold mt-2">{valorTotal}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg flex-1">
              <h2 className="text-xl font-bold mb-4">Gráfico de Vendas (Últimos 7 Dias)</h2>
              <div className="relative chart-container">
              <Line
  data={chartData}
  options={{
    responsive: true,
    maintainAspectRatio: false, // Permite que o gráfico se ajuste ao contêiner
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#1C4F2A",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: R$ ${tooltipItem.raw
              .toFixed(2)
              .replace(".", ",")}`;
          },
        },
        titleColor: "#1C4F2A",
        bodyColor: "#1C4F2A",
        footerColor: "#1C4F2A",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "dd/MM/yyyy",
          displayFormats: {
            day: "dd/MM/yyyy",
          },
        },
        title: {
          display: true,
          text: "Data",
          color: "#1C4F2A",
        },
        ticks: {
          color: "#1C4F2A",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valor",
          color: "#1C4F2A",
        },
        ticks: {
          callback: function (value) {
            return `R$ ${value.toFixed(2).replace(".", ",")}`; // Formata os valores em reais
          },
          color: "#1C4F2A",
        },
      },
    },
  }}
/>

              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg mb-6">
            <div className="flex flex-wrap justify-between">
              {cardsData.map((card) => (
                <Link
                  key={card.id}
                  to={card.link}
                  className="w-full sm:w-1/2 lg:w-1/3 mb-4"
                >
                  <div className="relative flex justify-center items-center">
                    <img
                      className="w-full rounded-lg shadow-lg"
                      src={card.image}
                      alt={card.label}
                    />
                    {/*<span className="absolute bottom-2 left-2 bg-white text-black px-2 py-1 rounded-md">
                      {card.label}
                    </span>*/}
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
}

export default HomeParceiros;
