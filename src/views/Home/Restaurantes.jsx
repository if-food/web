// Restaurantes.js
import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const Restaurantes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/restaurantes');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'Nome do Restaurante', accessor: 'nome' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Categoria', accessor: 'categoria' },
      { Header: 'Chegada', accessor: 'chegada' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="border-b p-2 text-left" style={{ color: '#1C4F2A' }}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="border-b p-2" style={{ color: '#1C4F2A' }}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Restaurantes;