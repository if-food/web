import React, { useState } from 'react';
import { categorySchema } from '../../validation/categoriaValidation';

function NovaCategoria({ onClose, onAddCategory }) {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const handleCreateCategory = async () => {
 
    try {
      await categorySchema.validate({ categoryName, description }, { abortEarly: false });
      onAddCategory(categoryName, description );  // Adiciona a nova categoria
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center">
      <div className="bg-gradient-to-t from-[#1F2026] via-black to-[#37383F] p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <button
            className="text-secondary_3_variant hover:text-secondary_3"
            onClick={onClose}
          >
            Voltar
          </button>
          <div className="text-right flex-col flex justify-center items-center">
              <p className="font-semibold text-secondary_3_variant">Restaurante Aberto</p>
              <p className="text-sm text-secondary_2">Dentro do horário programado</p>
          </div>
        </div>
        <h2 className="text-3xl text-secondary_3_variant font-semibold mb-4">Nova Categoria</h2>
        <div className="mb-4">
          <label className="block text-secondary_3_variant">Nome da Categoria</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Nome da Categoria"
          />
          {errors.categoryName && <p className="text-red-500 text-sm">{errors.categoryName}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-secondary_3_variant">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Descrição"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
       
        <div className="flex justify-end mt-6">
          <button className="bg-secondary_3 hover:bg-secondary_3_variant text-white text-xl font-bold py-2 px-4 rounded-2 mr-6 w-48" onClick={onClose}>
            Cancelar
          </button>
          <button className="bg-secondary_1 hover:bg-secondary_2 text-white text-xl font-bold py-2 px-4 rounded ml-6 w-48" onClick={handleCreateCategory}>
            Criar Categoria
          </button>
        </div>
      </div>
    </div>
  );
}

export default NovaCategoria;