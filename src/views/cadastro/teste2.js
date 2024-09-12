import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { formSchema } from '../../validation/cadastroValidation';
import ParceirosSidebar from '../../componentes/ParceirosSidebar';
import { getRestauranteId } from '../util/AuthenticationService';
import iffood from "../../assets/iffood.png";
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase'; // Certifique-se de exportar a configuração do Firebase
import pix from "../../assets/pix.png";
import cartao from "../../assets/mastercard.png";
import dinheiro from "../../assets/dinheiro.png";
import vr from "../../assets/vale-refeicao.png";
import va from "../../assets/VR-Alimentação.png";

const Cadastro = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
    });
    const id = getRestauranteId();
    const [formData, setFormData] = useState({
        nomeFantasia: '',
        razaoSocial: '',
        cnpj: '',
        categoria: "SUSHI",
        rua: '',
        bairro: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: '',
        aceitaPix: false,
        aceitaCartaoCredito: false,
        aceitaCartaoDebito: false,
        aceitaDinheiro: false,
        aceitaValeRefeicao: false,
        aceitaValeAlimentacao: false,
        foto: null,
        capa: null
    });

    function convertToBoolean(value) {
        return value === "on";
    }

    const handleImageUpload = async (file, imageType) => {
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                null,
                (error) => reject(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleSave = async () => {
        console.log(formData);
        try {
            const token = localStorage.getItem('token');
            formData.aceitaPix = convertToBoolean(formData.aceitaPix);
            formData.aceitaCartaoCredito = convertToBoolean(formData.aceitaCartaoCredito);
            formData.aceitaCartaoDebito = convertToBoolean(formData.aceitaCartaoDebito);
            formData.aceitaDinheiro = convertToBoolean(formData.aceitaDinheiro);
            formData.aceitaValeRefeicao = convertToBoolean(formData.aceitaValeRefeicao);
            formData.aceitaValeAlimentacao = convertToBoolean(formData.aceitaValeAlimentacao);

            // Upload da foto
            if (formData.foto) {
                const fotoURL = await handleImageUpload(formData.foto, 'foto');
                formData.fotoURL = fotoURL;
            }

            // Upload da foto de capa
            if (formData.capa) {
                const capaURL = await handleImageUpload(formData.capa, 'capa');
                formData.capaURL = capaURL;
            }

            await axios.put(`http://localhost:8080/api/restaurante/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            console.error('Erro ao atualizar o perfil', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:8080/api/restaurante/?restauranteId=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            reset({
                cnpj: response.data.cnpj,
                categoria: response.data.categoria,
            });
        } catch (error) {
            console.error('Erro ao buscar os dados', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.name;

        if (name === 'foto') {
            setFormData({
                ...formData,
                foto: file
            });
        } else if (name === 'capa') {
            setFormData({
                ...formData,
                capa: file
            });
        }
    };

    const onSubmit = async (data) => {
        console.log('Form submitted:', data);
        try {
            const token = localStorage.getItem('token');

            await axios.put(`http://localhost:8080/api/restaurante/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o perfil', error);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1 overflow-hidden">
                <ParceirosSidebar />
                <div className="w-full flex flex-col items-center justify-center overflow-y-auto">
                    <div className="mb-4 mt-4">
                        <img
                            src={iffood}
                            alt="If Food Logo"
                            className="w-52 h-52 object-contain"
                        />
                    </div>
                    <div className="p-1 rounded-lg shadow-lg w-5/6 overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-2 text-white">Cadastro</h2>
                        <div className="col-span-full">
                            <label htmlFor="foto" className="block text-sm font-medium leading-6 text-white">Adicione uma foto</label>
                            <div className="mt-1 flex items-center gap-x-3 mb-4">
                                <svg className="h-24 w-24 text-gray-300" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                </svg>

                                <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Alterar
                                </button>
                                <input type="file" name="foto" onChange={handleFileChange} className="sr-only" />
                            </div>
                        </div>
                        <div className="mb-4 bg-white">
                            <label className="block text-white mb-2" htmlFor="capa">Adicione uma foto de capa</label>
                            <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2a1 1 0 00-1 1v2.586l-3.707 3.707a1 1 0 00-.293.707v9.414a1 1 0 001 1h9.414a1 1 0 001-1v-9.414a1 1 0 00-.293-.707L13 6.586V3a1 1 0 00-1-1zm2 2h-4v1.586l2 2V5zM6 10a1 1 0 00-1 1v2.586l-2.707 2.707a1 1 0 00-.293.707v7.414a1 1 0 001 1h8.586a1 1 0 001-1v-7.414a1 1 0 00-.293-.707L8 13.586V11a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <div className="mt-4 text-sm leading-6 text-gray-600">
                                        <label htmlFor="capa" className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-900 hover:text-gray-600">
                                            <span>Adicionar foto de capa</span>
                                            <input id="capa" name="capa" type="file" onChange={handleFileChange} className="sr-only" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 sm:gap-y-8">
                                <div className="col-span-full">
                                    <label htmlFor="nomeFantasia" className="block text-sm font-medium leading-6 text-white">Nome Fantasia</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="nomeFantasia"
                                            name="nomeFantasia"
                                            {...register('nomeFantasia')}
                                            value={formData.nomeFantasia}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                {/* Adicione outros campos aqui */}
                                {/* ... */}
                                <div className="col-span-full">
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;
