import React from 'react';
import iffood from "../../assets/iffood.png";

function Home () {
    
    return (
        <div className="h-screen flex">
            <div className="p-8">
          {/* Texto de boas-vindas */}
          <h1 className="text-3xl font-bold text-[#BA913F] mb-8">
            Bem-vindo ao IF-food
          </h1>
          <h6 className="text-3xl font-bold text-white mb-16">
            Aqui você pode...
          </h6>

          <div className="justify-center">
          {/* Cards alinhados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card label="Gerenciar parceiros" />
            <Card label="Nosso faturamento" />
            <Card label="Nossas informações" />
            <Card label="Nosso marketing" />
          </div>            
          </div>
          
        </div>
        </div>
        
      );
    };
    
    const Card = ({ label }) => (
      <div className="bg-[#FF9431] w-[320px] h-[250px] p-6 rounded-lg shadow-lg opacity-65 flex items-center justify-center text-white  ">
        <h2 className="text-xl font-semibold mb-4">{label}</h2>
        {/* Adicione mais conteúdo ao card aqui, se necessário */}
      </div>
    );

export default Home;
