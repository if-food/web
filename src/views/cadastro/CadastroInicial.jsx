import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iffood from "../../assets/iffood.png";
import imagem1 from "../../assets/img1.png";
import { useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../../validation/cadastroValidation';

function CadastroInicial() {
    const { state } = useLocation();
    const [idRestaurante, setIdRestaurante] = useState(null);
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [categoria, setCategoria] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get(`http://localhost:8080/api/restaurante/${state.id}`)
                .then((response) => {
                    const { id, email, cnpj, password, categoria } = response.data;
                    setIdRestaurante(id);
                    setEmail(email);
                    setCnpj(cnpj);
                    setPassword(password);
                    setCategoria(categoria);
                })
                .catch((error) => {
                    console.error('Erro ao buscar restaurante:', error);
                });
        }
    }, [state]);

    const cadastrar = () => {
        const restauranteRequest = { email, password, cnpj, categoria };

        if (idRestaurante != null) {
            // Alteração
            axios.put(`http://localhost:8080/api/restaurante/${idRestaurante}`, restauranteRequest)
                .then(() => {
                    console.log('Restaurante alterado com sucesso.');
                })
                .catch((error) => {
                    if (error.response) {
                        console.error(error.response.data.errors[0].defaultMessage);
                    } else {
                        console.error('Erro ao cadastrar');
                    }
                });
        } else {
            // Cadastro
            axios.post('http://localhost:8080/api/restaurante', restauranteRequest)
                .then(() => {
                    console.log('Restaurante cadastrado com sucesso.');
                    navigate('/confirmar-cadastro');
                })
                .catch((error) => {
                    if (error.response) {
                        console.error(error.response.data.errors[0].defaultMessage);
                    } else {
                        console.error('Erro ao cadastrar');
                    }
                });
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="mb-8">
                    <img src={iffood} alt="If Food Logo" className="w-40 h-40 object-contain" />
                </div>
                <form onSubmit={handleSubmit(cadastrar)} className="bg-white p-10 rounded-lg shadow-lg w-5/6">
                    <h2 className="text-2xl font-bold mb-6">Cadastro</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="cnpj">CNPJ</label>
                        <input
                            {...register('cnpj')}
                            className="w-full px-3 py-2 border rounded-xl"
                            type="text"
                            id="cnpj"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />
                        {errors.cnpj && <p className="text-red-500 text-sm">{errors.cnpj.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            {...register('email')}
                            className="w-full px-3 py-2 border rounded-xl"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Senha</label>
                        <input
                            {...register('senha')}
                            className="w-full px-3 py-2 border rounded-xl"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.senha && <p className="text-red-500 text-sm">{errors.senha.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="categoria">Categoria</label>
                        <select
                            {...register('categoria')}
                            className="w-full px-3 py-2 border rounded-xl"
                            id="categoria"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="">Selecione uma categoria</option>
                            <option value="ITALIANO">Italiano</option>
                            <option value="CHINES">Chinês</option>
                            <option value="MEXICANO">Mexicano</option>
                            <option value="JAPONES">Japonês</option>
                            <option value="FRANCES">Francês</option>
                            <option value="BRASILEIRO">Brasileiro</option>
                            <option value="AMERICANO">Americano</option>
                            <option value="INDIANO">Indiano</option>
                            <option value="MEDITERRANEO">Mediterrâneo</option>
                            <option value="TURCO">Turco</option>
                            <option value="GREGO">Grego</option>
                            <option value="SUSHI">Sushi</option>
                            <option value="PIZZARIA">Pizzaria</option>
                            <option value="HAMBURGUERIA">Hamburgueria</option>
                            <option value="COMIDA_RAPIDA">Comida Rápida</option>
                            <option value="CAFETERIA">Cafeteria</option>
                            <option value="BISTRO">Bistrô</option>
                            <option value="GASTRONOMIA_REGIONAL">Gastronomia Regional</option>
                            <option value="RESTAURANTE_DE_FRUTOS_DO_MAR">Restaurante de Frutos do Mar</option>
                            <option value="STEAKHOUSE">Steakhouse</option>
                            <option value="VEGETARIANO">Vegetariano</option>
                            <option value="VEGANO">Vegano</option>
                            <option value="ORGANICO">Orgânico</option>
                            <option value="RAW_FOOD">Raw Food</option>
                            <option value="SEM_GLUTEN">Sem Glúten</option>
                            <option value="SEM_LACTOSE">Sem Lactose</option>
                            <option value="COMIDA_INTEGRAL">Comida Integral</option>
                            <option value="ALIMENTACAO_CONSCIENTE">Alimentação Consciente</option>
                            <option value="COMIDA_LOCAL_E_SAZONAL">Comida Local e Sazonal</option>
                            <option value="COMIDA_ETICA">Comida Ética</option>
                            <option value="RESTAURANTES_DE_FERMENTADOS">Restaurantes de Fermentados</option>
                            <option value="RESTAURANTES_DE_SUPERALIMENTOS">Restaurantes de Superalimentos</option>
                        </select>
                        {errors.categoria && <p className="text-red-500 text-sm">{errors.categoria.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-1/3 bg-green-500 text-white font-bold text-lg py-2 rounded-xl hover:bg-blue-700"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
            <div className="w-1/2">
                <img src={imagem1} alt="Placeholder" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}

export default CadastroInicial;