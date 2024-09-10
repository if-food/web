import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { itemSchema } from '../../validation/ProdutoValidation'; // Importe o esquema de validação
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../services/firebase'; // Certifique-se de que você está importando o `storage` corretamente

function NovoItem({ onClose, onAddItem, selectedCategoryId, selectedCategoryName, itemToEdit, restauranteId }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setPrice(itemToEdit.price);
      setDescription(itemToEdit.description);
      setImageUrl(itemToEdit.image); // Assume que a imagem é um URL ou similar
    } else {
      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
      setImageUrl('');
    }
  }, [itemToEdit]);

  const validate = async () => {
    try {
      await itemSchema.validate({
        name,
        price: parseFloat(price),
        description,
        image: imageUrl
      }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  const uploadImage = async () => {
    if (!image) return '';
  
    const imageRef = ref(storage, `images/${image.name}`);
    try {
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    const isValid = await validate();
    if (!isValid) return;

    try {
      let uploadedImageUrl = imageUrl; // Use a URL existente se não houver nova imagem
      if (image) {
        uploadedImageUrl = await uploadImage();
      }

      const requestData = {
        titulo: name,
        descricao: description,
        valorUnitario: parseFloat(price),
        restauranteId,
        categoriaId: selectedCategoryId,
        imagem: uploadedImageUrl // Use a URL da imagem do Firebase
      };

      if (itemToEdit) {
        // Atualizar item existente
        await axios.put(`http://localhost:8080/api/produto/?produtoId=${itemToEdit.id}&categoriaId=${selectedCategoryId}`, requestData);
        
      } else {
        // Criar novo item
        await axios.post(`http://localhost:8080/api/produto/?restauranteId=${restauranteId}&categoriaId=${selectedCategoryId}`, requestData);
      }

      if (onAddItem) onAddItem(requestData);
      onClose(); // Fechar o modal após salvar
    } catch (error) {
      console.error('Error making the request:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center">
      <div className="bg-gradient-to-t from-[#1F2026] via-black to-[#37383F] p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <button className="text-secondary_3_variant hover:text-secondary_3" onClick={onClose}>
            Voltar
          </button>
          <div className="text-right">
            <p className="font-semibold text-secondary_3_variant">Restaurante Aberto - {selectedCategoryName}</p>
            <p className="text-sm text-secondary_2">Dentro do horário programado</p>
          </div>
        </div>
        <h2 className="text-3xl text-secondary_3_variant font-semibold mb-4">
          {itemToEdit ? 'Editar Item' : 'Novo Item'}
        </h2>
        <div className="mb-4">
          <label className="block text-secondary_3_variant">Nome do Item</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Nome do Item"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/3">
            <label className="block text-secondary_3_variant">Preço</label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
          <div className="w-2/3">
            <label className="block text-secondary_3_variant">Categoria</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Categoria"
              value={selectedCategoryName}
              readOnly
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-secondary_3_variant">Descrição</label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-secondary_3_variant">Upload de Imagem</label>
          <input
            type="file"
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            accept=".jpeg, .jpg, .png"
            onChange={handleImageChange}
          />
          {image && <img src={URL.createObjectURL(image)} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          <p className="text-sm text-secondary_3_variant mt-2">
            Formatos: JPEG, JPG, PNG<br />
            Peso máximo: 20MB
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-secondary_1 hover:bg-secondary_2 text-white text-2xl font-bold py-2 px-4 rounded w-48"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NovoItem;
