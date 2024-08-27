import React, { useState } from 'react';
import Sidebar from '../../componentes/ParceirosSidebar';
import { FaSearch, FaChevronDown, FaChevronUp, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import NovaCategoria from './novaCategoria';
import NovoItem from './novoItem';

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

function Cardapio() {
    const [categories, setCategories] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showNovaCategoria, setShowNovaCategoria] = useState(false);
    const [currentCategoryForItem, setCurrentCategoryForItem] = useState('');
    const [itemToEdit, setItemToEdit] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});

    const handleAddCategory = (categoryName) => {
        if (categoryName) {
            setCategories({ ...categories, [categoryName]: [] });
            setSelectedCategory(categoryName);
            setShowNovaCategoria(false);
        } else {
            alert('Digite um nome para a nova categoria.');
        }
    };

    const handleAddItem = (item) => {
        if (currentCategoryForItem) {
            if (itemToEdit) {
                // Edit existing item
                setCategories({
                    ...categories,
                    [currentCategoryForItem]: categories[currentCategoryForItem].map(i =>
                        i.id === itemToEdit.id ? { ...item, id: i.id } : i
                    )
                });
                setItemToEdit(null);
            } else {
                // Add new item
                setCategories({
                    ...categories,
                    [currentCategoryForItem]: [
                        ...categories[currentCategoryForItem],
                        { ...item, id: generateId() }
                    ]
                });
            }
            setCurrentCategoryForItem(''); // Reset category for item
        } else {
            alert('Selecione uma categoria para adicionar o item.');
        }
    };

    const handleEditItem = (id, category) => {
        const item = categories[category].find(item => item.id === id);
        setItemToEdit(item);
        setCurrentCategoryForItem(category);
    };

    const handleDeleteItem = (id, category) => {
        const updatedItems = categories[category].filter(item => item.id !== id);
        setCategories({ ...categories, [category]: updatedItems });
    };

    const handleDeleteCategory = (category) => {
        if (window.confirm('Tem certeza de que deseja excluir esta categoria?')) {
            const updatedCategories = { ...categories };
            delete updatedCategories[category];
            setCategories(updatedCategories);
            if (selectedCategory === category) {
                setSelectedCategory('');
            }
        }
    };

    const toggleCategoryExpansion = (category) => {
        setExpandedCategories({
            ...expandedCategories,
            [category]: !expandedCategories[category]
        });
    };

    const handleShowNovoItem = (category) => {
        setCurrentCategoryForItem(category);
        setItemToEdit(null); // Clear item to edit
    };

    // Filter categories based on the search term
    const filteredCategories = Object.keys(categories).filter(cat =>
        cat.toLowerCase().includes(searchTerm.toLowerCase())
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
                                <div key={category} className="bg-gray-100 p-4 mb-2 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-secondary_3">{category}</h3>
                                        <div>
                                           
                                            <button
                                                onClick={() => toggleCategoryExpansion(category)}
                                                className="text-secondary_1 hover:text-secondary_2 text-2xl mx-2"
                                            >
                                                {expandedCategories[category] ? <FaChevronUp /> : <FaChevronDown />}
                                            </button>
                                        </div>
                                    </div>

                                    {expandedCategories[category] && (
                                        <div className="mt-4">
                                            <button
                                                onClick={() => handleShowNovoItem(category)}
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
                                                        <th className="px-6 py-3 text-left text-xs font-extrabold text-secondary_1  uppercase tracking-wider">
                                                            Nome
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-extrabold text-secondary_1  uppercase tracking-wider">
                                                            Preço
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-extrabold text-secondary_1  uppercase tracking-wider">
                                                            Descrição
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-extrabold text-secondary_1  uppercase tracking-wider">
                                                            Ações
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white text-secondary_1 divide-y divide-secondary_3">
                                                    {categories[category].map(item => (
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
                                                                    onClick={() => handleEditItem(item.id, category)}
                                                                    className="text-2xl text-secondary_1 hover:text-secondary_2 mx-2"
                                                                >
                                                                    <FaEdit />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteItem(item.id, category)}
                                                                    className="text-2xl text-atention_02  hover:text-red-400 mx-2"
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
                                                    onClick={() => handleDeleteCategory(category)}
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

            <footer className="bg-gradient-to-t from-[#1F2026] via-#1c1918 to-[#37383F] text-secondary_3 py-4 text-center">
                <p>&copy; 2024 Seu Restaurante. Todos os direitos reservados.</p>
            </footer>

            {showNovaCategoria && (
                <NovaCategoria
                    onClose={() => setShowNovaCategoria(false)}
                    onAddCategory={handleAddCategory}
                />
            )}

            {currentCategoryForItem && (
                <NovoItem
                    onClose={() => setCurrentCategoryForItem('')}
                    onAddItem={handleAddItem}
                    selectedCategory={currentCategoryForItem}
                    itemToEdit={itemToEdit}
                />
            )}
        </div>
    );
}

export default Cardapio;
