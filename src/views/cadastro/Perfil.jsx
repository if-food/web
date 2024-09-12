import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { formSchema } from '../../validation/cadastroValidation';
import ParceirosSidebar from '../../componentes/ParceirosSidebar';
import { getRestauranteId } from '../util/AuthenticationService';
import iffood from "../../assets/iffood.png";
import { useNavigate } from 'react-router-dom';
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

    });
    function convertToBoolean(value) {
        return value === "on";
    }
    const handleSave = async () => {
        console.log(formData)
        try {
            const token = localStorage.getItem('token'); // Obtém o token JWT do localStorage
            formData.aceitaPix = convertToBoolean(formData.aceitaPix);
            formData.aceitaCartaoCredito = convertToBoolean(formData.aceitaCartaoCredito);
            formData.aceitaCartaoDebito = convertToBoolean(formData.aceitaCartaoDebito);
            formData.aceitaDinheiro = convertToBoolean(formData.aceitaDinheiro);
            formData.aceitaValeRefeicao = convertToBoolean(formData.aceitaValeRefeicao);
            formData.aceitaValeAlimentacao = convertToBoolean(formData.aceitaValeAlimentacao);          
            await axios.put(`http://localhost:8080/api/restaurante/${id}`, formData, {
                /*  headers: {
                   Authorization: `Bearer ${token}` // Envia o token no header
                 } */
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
            const token = localStorage.getItem('token'); // Obtém o token JWT do localStorage

            const response = await axios.get(`http://localhost:8080/api/restaurante/?restauranteId=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Envia o token no header
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
        console.log(e.target.value)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
            
        });
    };

    const onSubmit = async (data) => {
        console.log('Form submitted:', data);
        try {
            const token = localStorage.getItem('token'); // Obtém o token JWT do localStorage

            await axios.put(`http://localhost:8080/api/restaurante/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}` // Envia o token no header
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
                        <div class="col-span-full">
                            <label for="photo" class="block text-sm font-medium leading-6 text-white">Adicione uma foto</label>
                            <div class="mt-1 flex items-center gap-x-3 mb-4">
                                <svg class="h-24 w-24 text-gray-300" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                </svg>

                                <button
                                    type="button"
                                    class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ">
                                    Alterar
                                </button>

                            </div>
                        </div>
                        <div className="mb-4 bg-white">
                            <label className="block text-white mb-2" htmlFor="cover-photo">Adicione uma foto de capa</label>
                            <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                    </svg>
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                            <span>Upload</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">ou arraste até aqui</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF até 10MB</p>
                                </div>
                            </div>
                        </div>
                        <h4 className="text-2xl font-bold mb-6 mt-5 text-white">Informações gerais</h4>
                        <div className="flex space-x-4">
                            <div className="w-1/2 mb-4">
                                <label className="block text-white mb-2" htmlFor="nomeFantasia">Nome Fantasia</label>
                                <input
                                    {...register('nomeFantasia')}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    placeholder="Insira o nome do responsável"
                                    type="text"
                                    id="nomeFantasia"
                                    value={formData.nomeFantasia}
                                    onChange={handleChange}
                                />
                                {errors.nomeFantasia && <p className="text-red-500 text-sm">{errors.nomeFantasia.message}</p>}
                            </div>
                            <div className="w-1/2 mb-4">
                                <label className="block text-white mb-2" htmlFor="razaoSocial">Razão Social</label>
                                <input
                                    {...register('razaoSocial')}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    placeholder="Insira o nome do restaurante"
                                    type="text"
                                    id="razaoSocial"
                                    value={formData.razaoSocial}
                                    onChange={handleChange}
                                />
                                {errors.razaoSocial && <p className="text-red-500 text-sm">{errors.razaoSocial.message}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2 mb-4">
                                <label className="block text-white mb-2" htmlFor="cnpj">CNPJ</label>
                                <input
                                    {...register('cnpj')}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    placeholder="Insira o CNPJ do restaurante"
                                    type="text"
                                    id="cnpj"
                                    value={formData.cnpj}
                                    onChange={handleChange}
                                />
                                {errors.cnpj && <p className="text-red-500 text-sm">{errors.cnpj.message}</p>}
                            </div>
                            <div className="w-1/2 mb-4">
                                <label className="block text-white mb-2" htmlFor="categoria">Categoria</label>
                                <select
                                    {...register('categoria')}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    id="categoria"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione uma categoria</option>
                                    <option value="VEGETARIANO">Vegetariano</option>
                                    <option value="VEGANO">Vegano</option>
                                    <option value="ORGÂNICO">Orgânico</option>
                                    <option value="ITALIANO">Italiano</option>
                                    <option value="CHINÊS">Chinês</option>
                                    <option value="MEXICANO">Mexicano</option>
                                    <option value="JAPONÊS">Japonês</option>
                                    <option value="FRANCÊS">Francês</option>
                                    <option value="SUSHI">Sushi</option>
                                    <option value="PIZZARIA">Pizzaria</option>
                                    <option value="HAMBURGUERIA">Hamburgueria</option>
                                    <option value="CAFETERIA">Cafeteria</option>
                                    <option value="BISTRO">Bistrô</option>
                                </select>
                                {errors.categoria && <p className="text-red-500 text-sm">{errors.categoria.message}</p>}
                            </div>
                        </div>
                        <h4 className="text-2xl font-bold mb-6 mt-5 text-white">Endereço</h4>
                        <div className="flex space-x-4">
                            <div className="w-1/2 mb-4">
                                <label className="block text-white mb-2" htmlFor="rua">Rua</label>
                                <input
                                    {...register('rua')}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    placeholder="Insira o rua"
                                    type="text"
                                    id="rua"
                                    value={formData.rua}
                                    onChange={handleChange}
                                />
                                {errors.rua && <p className="text-red-500 text-sm">{errors.rua.message}</p>}
                            </div>
                            <div className="w-1/2 mb-4">
                                <label className="block text-white mb-2" htmlFor="bairro">Bairro</label>
                                <input
                                    {...register('bairro')}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    placeholder="Insira o bairro"
                                    type="text"
                                    id="bairro"
                                    value={formData.bairro}
                                    onChange={handleChange}
                                />
                                {errors.bairro && <p className="text-red-500 text-sm">{errors.bairro.message}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="w-1/2 mb-4">
                                <label className="block text-white mb-2" htmlFor="numero">Número</label>
                                <input
                                    {...register('numero')}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    placeholder="Insira o número"
                                    type="text"
                                    id="numero"
                                    value={formData.numero}
                                    onChange={handleChange}
                                />
                                {errors.numero && <p className="text-red-500 text-sm">{errors.numero.message}</p>}
                            </div>
                            <div className="w-1/2 mb-4">
                                <label className="block text-white mb-2" htmlFor="cidade">Cidade</label>
                                <input
                                    {...register('cidade')}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    placeholder="Insira a cidade"
                                    type="text"
                                    id="cidade"
                                    value={formData.cidade}
                                    onChange={handleChange}
                                />
                                {errors.cidade && <p className="text-red-500 text-sm">{errors.cidade.message}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-6">
                            <div className="w-1/2 mb-4">
                                <label className="block text-white mb-2" htmlFor="estado">Estado</label>
                                <input
                                    {...register('estado')}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    placeholder="Insira o Estado"
                                    type="text"
                                    id="estado"
                                    value={formData.estado}
                                    onChange={handleChange}
                                />
                                {errors.estado && <p className="text-red-500 text-sm">{errors.estado.message}</p>}
                            </div>
                            <div className="w-1/2 mb-4">
                                <label className="block text-white mb-2" htmlFor="cep">CEP</label>
                                <input
                                    {...register('cep')}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    placeholder="Insira o CEP"
                                    type="text"
                                    id="cep"
                                    value={formData.cep}
                                    onChange={handleChange}
                                />
                                {errors.cep && <p className="text-red-500 text-sm">{errors.cep.message}</p>}
                            </div>
                        </div>

                        <div className="flex space-x-6">


                            <div className="w-1/2 mb-4">
                                <img src={pix} alt="" />
                                <label className="block text-white mb-2" htmlFor="aceitaPix">PIX</label>
                                <input
                                    {...register('aceitaPix')}
                                    className="mr-2"
                                    type="checkbox"
                                    id="aceitaPix"
                                    checked={formData.aceitaPix}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-1/2 mb-4">
                                <img src={cartao} alt="" />
                                <label className="block text-white mb-2" htmlFor="aceitaCartaoCredito">Cartão de Crédito</label>
                                <input
                                    {...register('aceitaCartaoCredito')}
                                    className="mr-2"
                                    type="checkbox"
                                    id="aceitaCartaoCredito"
                                    checked={formData.aceitaCartaoCredito}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-1/2 mb-4">
                                <img src={cartao} alt="" />
                                <label className="block text-white mb-2" htmlFor="aceitaCartaoDebito">Cartão de Débito</label>
                                <input
                                    {...register('aceitaCartaoDebito')}
                                    className="mr-2"
                                    type="checkbox"
                                    id="aceitaCartaoDebito"
                                    checked={formData.aceitaCartaoDebito}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-1/2 mb-4">
                                <img className='w-14' src={dinheiro} alt="" />
                                <label className="block text-white mb-2" htmlFor="aceitaDinheiro">Dinheiro</label>
                                <input
                                    {...register('aceitaDinheiro')}
                                    className="mr-2"
                                    type="checkbox"
                                    id="aceitaDinheiro"
                                    checked={formData.aceitaDinheiro}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-1/2 mb-4">
                                <img className='w-12' src={vr} alt="" />
                                <label className="block text-white mb-2" htmlFor="aceitaValeRefeicao">Vale Refeição</label>
                                <input
                                    {...register('aceitaValeRefeicao')}
                                    className="mr-2"
                                    type="checkbox"
                                    id="aceitaValeRefeicao"
                                    checked={formData.aceitaValeRefeicao}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-1/2 mb-4">
                                <img className='w-12' src={va} alt="" />
                                <label className="block text-white mb-2" htmlFor="aceitaValeAlimentacao">Aceita Vale Alimentação</label>
                                <input
                                    {...register('aceitaValeAlimentacao')}
                                    className="mr-2"
                                    type="checkbox"
                                    id="aceitaValeAlimentacao"
                                    checked={formData.aceitaValeAlimentacao}
                                    onChange={handleChange}
                                />
                            </div>


                        </div>


                        <button className="w-1/3 bg-secondary_1 text-white font-bold text-xl py-2 rounded-xl hover:bg-secondary_2 mt-5 mb-4" onClick={handleSave}>Salvar</button>

                    </div>
                </div>
            </div>
            <footer className="bg-gradient-to-t from-[#1F2026] via-[#1c1918] to-[#37383F] text-secondary_3_variant py-4 text-center mt-auto">
                <p>&copy; 2024 Seu Restaurante. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default Cadastro;
