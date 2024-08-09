import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

const ListRestaurantes = () => {
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('');
  const [categoria, setCategoria] = useState('');
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/restaurantes')
      .then(response => {
        setRestaurantes(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const filteredRestaurantes = restaurantes.filter(restaurante =>
    restaurante.nome.toLowerCase().includes(nome.toLowerCase()) &&
    restaurante.status.toLowerCase().includes(status.toLowerCase()) &&
    restaurante.categoria.toLowerCase().includes(categoria.toLowerCase())
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to top, #1F2026, black, #37383F)',
      padding: '20px'
    }}>
      <h1 style={{ paddingTop:"90px", paddingLeft: "5em", paddingBottom: "2em", fontSize: "2em", color: "#BA913F" }}>Restaurantes</h1>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
      }}>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '5px', 
          width: '90%', 
          marginBottom: '5px'
        }}>
            <Icon name='search' style={{ marginRight: '10px', color: "#1C4F2A", fontSize: "2em" }} />
          <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
            <input
              type="text"
              placeholder="Buscar por Nome"
              value={nome}
              onChange={handleNomeChange}
              style={{ 
                paddingLeft: '10px', 
                width: '100%', 
                backgroundColor: "#E3E3E3", 
                borderRadius:"5px", 
                padding: '10px'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: '20%' }}>
            <input
              type="text"
              placeholder="Buscar por Status"
              value={status}
              onChange={handleStatusChange}
              style={{ 
                paddingLeft: '10px', 
                width: '100%', 
                backgroundColor: "#E3E3E3", 
                borderRadius:"5px", 
                padding: '10px'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
            <input
              type="text"
              placeholder="Buscar por Categoria"
              value={categoria}
              onChange={handleCategoriaChange}
              style={{ 
                paddingLeft: '10px', 
                width: '100%', 
                backgroundColor: "#E3E3E3", 
                borderRadius:"5px", 
                padding: '10px'
              }}
            />
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          padding: '10px',  
          width: '91%', 
          overflowX: 'auto',
        }}>
          <table style={{ backgroundColor: 'white', width: '100%', borderRadius: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px #ddd', padding: '8px', color: "#1C4F2A" }}>Nome</th>
                <th style={{ border: '1px #ddd', padding: '8px', color: "#1C4F2A" }}>Status</th>
                <th style={{ border: '1px #ddd', padding: '8px', color: "#1C4F2A" }}>Categoria</th>
              </tr>
            </thead>
            <tbody>
              {filteredRestaurantes.map((restaurante, index) => (
                <tr key={index}>
                  <td style={{ border: '1px #ddd', padding: '8px' }}>{restaurante.nome}</td>
                  <td style={{ border: '1px #ddd', padding: '8px' }}>{restaurante.status}</td>
                  <td style={{ border: '1px #ddd', padding: '8px' }}>{restaurante.categoria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListRestaurantes;