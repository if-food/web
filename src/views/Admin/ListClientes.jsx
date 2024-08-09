import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const ListClientes = () => {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:5000/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  const handleCpfChange = (e) => {
    setCpf(e.target.value);
  };

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.cpf.includes(cpf) && cliente.nome.toLowerCase().includes(nome.toLowerCase())
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to top, #1F2026, black, #37383F)',
      padding: '20px'
    }}>
      <h1 style={{ paddingTop:"90px", paddingLeft: "5em", paddingBottom: "2em", fontSize: "2em", color: "#BA913F" }}>Clientes</h1>

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
          <div style={{ display: 'flex', alignItems: 'center', width: '25%' }}>
            <Icon name='search' style={{ marginRight: '10px', color: "#1C4F2A", fontSize: "2em" }} />
            <input
              type="text"
              placeholder="Buscar por CPF"
              value={cpf}
              onChange={handleCpfChange}
              style={{ 
                paddingLeft: '10px', 
                width: '100%', 
                backgroundColor: "#E3E3E3", 
                borderRadius:"5px", 
                padding: '10px'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: '25%' }}>
            <Icon name='search' style={{ marginRight: '10px', color: "#1C4F2A", fontSize: "2em" }} />
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
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          padding: '10px',  
          width: '91%', 
          overflowX: 'auto',
        }}>
          <table style={{ backgroundColor: 'white', width: '100%', borderRadius: '10px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px #ddd', padding: '8px', color: "#1C4F2A" }}>CPF</th>
                <th style={{ border: '1px #ddd', padding: '8px', color: "#1C4F2A"  }}>Nome</th>
                <th style={{ border: '1px #ddd', padding: '8px', color: "#1C4F2A"  }}>Email</th>
                <th style={{ border: '1px #ddd', padding: '8px', color: "#1C4F2A"  }}>Telefone</th>
                <th style={{ border: '1px #ddd', padding: '8px', color: "#1C4F2A"  }}>Cidade</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente, index) => (
                <tr key={index}>
                  <td style={{ border: '1px #ddd', padding: '8px' }}>{cliente.cpf}</td>
                  <td style={{ border: '1px #ddd', padding: '8px' }}>{cliente.nome}</td>
                  <td style={{ border: '1px #ddd', padding: '8px' }}>{cliente.email}</td>
                  <td style={{ border: '1px #ddd', padding: '8px' }}>{cliente.telefone}</td>
                  <td style={{ border: '1px #ddd', padding: '8px' }}>{cliente.cidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListClientes;