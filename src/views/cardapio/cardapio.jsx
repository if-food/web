import React, { useEffect, useState } from 'react';
import Sidebar from '../../componentes/ParceirosSidebar';
import { FaSearch, FaChevronDown, FaChevronUp, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import NovaCategoria from './novaCategoria';
import NovoItem from './novoItem';
import { getRestauranteId } from '../util/AuthenticationService';
import axios from 'axios';
import { storage } from '../../services/firebase'; // Certifique-se de que o caminho está correto
import { ref, deleteObject } from 'firebase/storage';

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

function Cardapio() {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showNovaCategoria, setShowNovaCategoria] = useState(false);
    const [currentCategoryForItem, setCurrentCategoryForItem] = useState({ id: '', nome: '' });
    const [itemToEdit, setItemToEdit] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [restauranteId, setRestauranteId] = useState('');

    useEffect(() => {
        const id = getRestauranteId();
        setRestauranteId(id);
        fetchCategories(id);
    }, []);

    const fetchCategories = async (id) => {
        const defaultImageUrl = 'path/to/default/image.jpg'; // Caminho para a imagem padrão

        try {
            const response = await axios.get(`http://localhost:8080/api/categoria_produto/cardapio/?restauranteId=${id}`);
            const categoriesData = await Promise.all(response.data.map(async (category) => {
                const items = await Promise.all(category.produtos.map(async (produto) => {
                    let imageUrl = defaultImageUrl;

                    if (produto.imagem) { // Usa a URL da imagem armazenada no backend
                        imageUrl = produto.imagem;
                    }

                    return {
                        id: produto.id,
                        name: produto.titulo,
                        description: produto.descricao,
                        image: imageUrl,
                        price: produto.valorUnitario
                    };
                }));

                return {
                    ...category,
                    items
                };
            }));

            setCategories(categoriesData);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error.message);
            alert(`Erro ao carregar categorias: ${error.message}`);
        }
    };

    const handleAddCategory = async (categoryName, description) => {
        if (categoryName) {
            let categoryRequest = {
                nome: categoryName,
                descricao: description,
            };
            try {
                const response = await axios.post(`http://localhost:8080/api/categoria_produto/?restauranteId=${restauranteId}`, categoryRequest);
                const newCategory = { ...response.data, items: [] };
                setCategories([...categories, newCategory]);
                setSelectedCategoryId(newCategory.id);
                setShowNovaCategoria(false);
            } catch (error) {
                console.error('Erro ao adicionar categoria:', error);
                alert('Erro ao adicionar categoria: ' + error.message);
            }
        } else {
            alert('Digite um nome para a nova categoria.');
        }
    };

    const handleAddItem = (item) => {
        if (currentCategoryForItem.id) {
            setCategories(categories.map(category => {
                if (category.id === currentCategoryForItem.id) {
                    if (itemToEdit) {
                        return {
                            ...category,
                            items: category.items.map(i => i.id === itemToEdit.id ? { ...item, id: i.id } : i)
                        };
                    } else {
                        return {
                            ...category,
                            items: [...category.items, { ...item, id: generateId() }]
                        };
                    }
                }
                return category;
            }));
            setItemToEdit(null);
            setCurrentCategoryForItem({ id: '', nome: '' });
        } else {
            alert('Selecione uma categoria para adicionar o item.');
        }
    };

    const handleEditItem = (id, categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        const item = category.items.find(item => item.id === id);
        setItemToEdit(item);
        setCurrentCategoryForItem({ id: categoryId, nome: category.nome });
    };

    const handleDeleteItem = async (id, categoryId, imageUrl) => {
        try {
            // Exclui a imagem do Firebase Storage, se a URL estiver disponível
            if (imageUrl) {
                try {
                    const imageRef = ref(storage, imageUrl); // Referência à imagem
                    await deleteObject(imageRef); // Exclui a imagem
                } catch (imageError) {
                    console.error('Erro ao excluir imagem:', imageError);
                    alert('Erro ao excluir imagem: ' + (imageError.response?.data?.message || imageError.message));
                }
            }
        
            // Exclui o item do backend
            await axios.delete(`http://localhost:8080/api/produto/${id}`);
            console.log('Produto excluído com sucesso');
        
            // Atualiza o estado local após a exclusão
            setCategories(prevCategories =>
                prevCategories.map(category => {
                    if (category.id === categoryId) {
                        return {
                            ...category,
                            items: category.items.filter(item => item.id !== id)
                        };
                    }
                    return category;
                })
            );
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto: ' + (error.response?.data?.message || error.message));
        }
    };
    
    
    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('Tem certeza de que deseja excluir esta categoria?')) {
            try {
                // Chamada para o backend para excluir a categoria
                await axios.delete(`http://localhost:8080/api/categoria_produto/${categoryId}`);

                // Atualiza o estado local após a exclusão
                setCategories(categories.filter(category => category.id !== categoryId));
                if (selectedCategoryId === categoryId) {
                    setSelectedCategoryId('');
                }
            } catch (error) {
                console.error('Erro ao excluir categoria:', error);
                alert('Erro ao excluir categoria: ' + error.message);
            }
        }
    };

    const toggleCategoryExpansion = (categoryId) => {
        setExpandedCategories({
            ...expandedCategories,
            [categoryId]: !expandedCategories[categoryId]
        });
        setSelectedCategoryId(categoryId);
    };

    const handleShowNovoItem = (categoryId, categoryName) => {
        setCurrentCategoryForItem({ id: categoryId, nome: categoryName });
        setItemToEdit(null);
    };

    const filteredCategories = categories.filter(cat =>
        cat.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <header className="bg-blue-600 text-white h-40 flex items-center justify-center text-2xl font-bold mt-4 mr-4 rounded-xl">
                        <h1>Cardápio</h1>
                    </header>

                    <div className="flex-1 flex flex-col overflow-hidden p-4">
                        <div className="flex justify-end mb-4">
                            <span className="text-xl font-semibold text-secondary_3 mt-4">Restaurante Aberto</span>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center border w-1/2 bg-white rounded-2xl overflow-hidden">
                                <input
                                    type="text"
                                    placeholder="Pesquisar por categoria..."
                                    className="p-2 w-full outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="p-2 text-xl flex items-center justify-center">
                                    <FaSearch className='text-secondary_1' />
                                </button>
                            </div>

                            <div className='ml-6'>
                                <button
                                    onClick={() => setShowNovaCategoria(true)}
                                    className="bg-secondary_1 hover:bg-secondary_2 text-white py-2 px-4 rounded-xl"
                                >
                                    <div className='flex '>
                                        <FaPlus className='mr-2' />
                                        Nova Categoria
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col overflow-y-auto">
                            {filteredCategories.map(category => (
                                <div key={category.id} className="bg-gray-100 p-4 mb-2 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-secondary_3">{category.nome}</h3>
                                        <div>
                                            <button
                                                onClick={() => toggleCategoryExpansion(category.id)}
                                                className="text-secondary_1 hover:text-secondary_2 text-2xl mx-2"
                                            >
                                                {expandedCategories[category.id] ? <FaChevronUp /> : <FaChevronDown />}
                                            </button>
                                        </div>
                                    </div>

                                    {expandedCategories[category.id] && (
                                        <div className="mt-4">
                                            <button
                                                onClick={() => handleShowNovoItem(category.id, category.nome)}
                                                className="bg-secondary_1 hover:bg-secondary_2 text-white font-bold py-2 px-4 rounded-xl"
                                            >
                                                <div className='flex '>
                                                    <FaPlus className='mr-2' />
                                                    Novo Item
                                                </div>
                                            </button>
                                            <table className="min-w-full divide-y divide-secondary_3 mt-2">
                                                <thead className="bg-gray-200">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-extrabold text-secondary_1 uppercase tracking-wider">
                                                            Imagem
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-extrabold text-secondary_1 uppercase tracking-wider">
                                                            Nome
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-extrabold text-secondary_1 uppercase tracking-wider">
                                                            Preço
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-extrabold text-secondary_1 uppercase tracking-wider">
                                                            Descrição
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-extrabold text-secondary_1 uppercase tracking-wider">
                                                            Ações
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white text-secondary_1 divide-y divide-secondary_3">
                                                    {category.items.map(item => (
                                                        <tr key={item.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                                                                {item.name}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                                                R$ {item.price}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                {item.description}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <button
                                                                    onClick={() => handleEditItem(item.id, category.id)}
                                                                    className="text-2xl text-secondary_1 hover:text-secondary_2 mx-2"
                                                                >
                                                                    <FaEdit />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteItem(item.id, category.id, item.image)}
                                                                    className="text-2xl text-atention_02 hover:text-red-400 mx-2"
                                                                >
                                                                    <FaTrashAlt />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className='flex justify-center items-center w-full'>
                                                <button
                                                    onClick={() => handleDeleteCategory(category.id)}
                                                    className="text-atention_02 hover:text-red-400 text-xl m-4"
                                                >
                                                    <span className='flex justify-center items-center text-lg'>
                                                        <FaTrashAlt className='mr-2' />
                                                        Excluir Categoria
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showNovaCategoria && (
                <NovaCategoria
                    onClose={() => setShowNovaCategoria(false)}
                    onAddCategory={handleAddCategory}
                />
            )}

            {currentCategoryForItem.id && (
                <NovoItem
                    onClose={() => setCurrentCategoryForItem({ id: '', nome: '' })}
                    onAddItem={handleAddItem}
                    restauranteId={restauranteId}
                    selectedCategoryId={currentCategoryForItem.id}
                    selectedCategoryName={currentCategoryForItem.nome}
                    itemToEdit={itemToEdit}
                />
            )}
        </div>
    );
}

export default Cardapio;