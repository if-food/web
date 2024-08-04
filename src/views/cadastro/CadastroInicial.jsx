import axios from "axios";
import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import iffood from "../../assets/iffood.png";
import imagem1 from "../../assets/imagem1.png";
import { useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../../validation/cadastroValidation';

function Cadastro() {
    const { state } = useLocation();
    const [idRestaurante, setIdRestaurante] = useState(null);
    const [email, setEmail] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [password, setPassword] = useState('');

    const { register, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get(`http://localhost:8080/restaurantes/${state.id}`)
                .then((response) => {
                    const { id, email, nomeResponsavel, password } = response.data;
                    setIdRestaurante(id);
                    setEmail(email);
                    setNomeResponsavel(nomeResponsavel);
                    setPassword(password);
                })
                .catch((error) => {
                    console.error('Erro ao buscar restaurante:', error);
                });
        }
    }, [state]);

    const cadastrar = () => {
        const restauranteRequest = { email, password };

        if (idRestaurante != null) {
            // Alteração
            axios.put(`http://localhost:8080/restaurantes/${idRestaurante}`, restauranteRequest)
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
            axios.post('http://localhost:8080/restaurantes', restauranteRequest)
                .then(() => {
                    console.log('Restaurante cadastrado com sucesso.');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        cadastrar();
        navigate('/confirmar-cadastro');
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="mb-8">
                    <img src={iffood} alt="If Food Logo" className="w-40 h-40 object-contain" />
                </div>
                <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg w-5/6">
                    <h2 className="text-2xl font-bold mb-6">Cadastro</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="nome">Nome do Responsável</label>
                        <input
                        {...register('nomeResponsavel')}
                            className="w-full px-3 py-2 border rounded-xl"
                            type="text"
                            id="nomeResponsavel"
                            value={nomeResponsavel}
                            onChange={(e) => nomeResponsavel(e.target.value)}
                        />
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

export default Cadastro;
