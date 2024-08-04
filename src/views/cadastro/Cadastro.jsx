import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../../validation/cadastroValidation';


import iffood from "../../assets/iffood.png";
import imagem1 from "../../assets/imagem1.png";
import { Link } from 'react-router-dom';

const Cadastro = () => {


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
    });

    const [locaisEntrega, setLocaisEntrega] = useState([{ cidade: '' }]);

    const onSubmit = data => {
        console.log(data);
    };

    const adicionarLocalEntrega = () => {
        setLocaisEntrega([...locaisEntrega, { cidade: '' }]);
    };

    const removerLocalEntrega = index => {
        const novosLocaisEntrega = locaisEntrega.filter((_, i) => i !== index);
        setLocaisEntrega(novosLocaisEntrega);
    };

    return (
        <div className="flex">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="mb-1">
                    <img
                        src={iffood}
                        alt="If Food Logo"
                        className="w-40 h-40 object-contain"
                    />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-1 rounded-lg shadow-lg w-5/6">
                    <h2 className="text-2xl font-bold mb-2 text-white">Cadastro</h2>

                    <div class="col-span-full">
                        <label for="photo" class="block text-sm font-medium leading-6 text-white">Adicione uma foto</label>
                        <div class="mt-1 flex items-center gap-x-3">
                            <svg class="h-24 w-24 text-gray-300" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                            </svg>
                            
                                <button
                                    type="button"
                                    class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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
                            <label className="block text-white mb-2" htmlFor="nomeResponsavel">Responsável</label>
                            <input
                                {...register('nomeResponsavel')}
                                className="w-full px-3 py-2 border rounded-xl"
                                placeholder="Insira o nome do responsável"
                                type="text"
                                id="nomeResponsavel"
                            />
                            {errors.nomeResponsavel && <p className="text-red-500 text-sm">{errors.nomeResponsavel.message}</p>}
                        </div>
                        <div className="w-1/2 mb-4">
                            <label className="block text-white mb-2" htmlFor="nomeRestaurante">Nome do restaurante</label>
                            <input
                                {...register('nomeRestaurante')}
                                className="w-full px-3 py-2 border rounded-xl"
                                placeholder="Insira o nome do restaurante"
                                type="text"
                                id="nomeRestaurante"
                            />
                            {errors.nomeRestaurante && <p className="text-red-500 text-sm">{errors.nomeRestaurante.message}</p>}
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
                            />
                            {errors.cnpj && <p className="text-red-500 text-sm">{errors.cnpj.message}</p>}
                        </div>
                        <div className="w-1/2 mb-4">
                            <label className="block text-white mb-2" htmlFor="segmento">Segmento</label>
                            <input
                                {...register('segmento')}
                                className="w-full px-3 py-2 border rounded-xl"
                                placeholder="Insira o segmento do restaurante"
                                type="text"
                                id="segmento"
                            />
                            {errors.segmento && <p className="text-red-500 text-sm">{errors.segmento.message}</p>}
                        </div>
                    </div>
                    <div className="flex space-x-6">
                        <div className="w-1/2 mb-4">
                            <label className="block text-white mb-2" htmlFor="email">Email</label>
                            <input
                                {...register('email')}
                                className="w-full px-3 py-2 border rounded-xl"
                                placeholder="Insira o e-mail do administrador"
                                type="email"
                                id="email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="w-1/2 mb-4">
                            <label className="block text-white mb-2" htmlFor="senha">Senha</label>
                            <input
                                {...register('senha')}
                                className="w-full px-3 py-2 border rounded-xl"
                                placeholder="Insira sua senha"
                                type="password"
                                id="senha"
                            />
                            {errors.senha && <p className="text-red-500 text-sm">{errors.senha.message}</p>}
                        </div>
                    </div>

                    <h4 className="text-2xl font-bold mb-6 mt-5 text-white">Endereço</h4>
                    <div className="flex space-x-4">
                        <div className="w-1/2 mb-4">
                            <label className="block text-white mb-2" htmlFor="logradouro">Logradouro</label>
                            <input
                                {...register('logradouro')}
                                className="w-full px-3 py-2 border rounded-xl"
                                placeholder="Insira o logradouro"
                                type="text"
                                id="logradouro"
                            />
                            {errors.logradouro && <p className="text-red-500 text-sm">{errors.logradouro.message}</p>}
                        </div>
                        <div className="w-1/2 mb-4">
                            <label className="block text-white mb-2" htmlFor="bairro">Bairro</label>
                            <input
                                {...register('bairro')}
                                className="w-full px-3 py-2 border rounded-xl"
                                placeholder="Insira o bairro"
                                type="text"
                                id="bairro"
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
                            />
                            {errors.cidade && <p className="text-red-500 text-sm">{errors.cidade.message}</p>}
                        </div>
                    </div>
                    <div className="flex space-x-6">
                        <div className="w-1/2 mb-4">
                            <label className="block text-white mb-2" htmlFor="uf">UF</label>
                            <input
                                {...register('uf')}
                                className="w-full px-3 py-2 border rounded-xl"
                                placeholder="Insira o UF"
                                type="text"
                                id="uf"
                            />
                            {errors.uf && <p className="text-red-500 text-sm">{errors.uf.message}</p>}
                        </div>
                        <div className="w-1/2 mb-4">
                            <label className="block text-white mb-2" htmlFor="cep">CEP</label>
                            <input
                                {...register('cep')}
                                className="w-full px-3 py-2 border rounded-xl"
                                placeholder="Insira o CEP"
                                type="text"
                                id="cep"
                            />
                            {errors.cep && <p className="text-red-500 text-sm">{errors.cep.message}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Locais de entrega</label>
                        {locaisEntrega.map((local, index) => (
                            <div key={index} className="flex space-x-4 mb-4">
                                <input
                                    {...register(`locaisEntrega.${index}.cidade`)}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    placeholder="Insira o nome da cidade"
                                    type="text"
                                />
                                <input
                                    {...register(`locaisEntrega.${index}.taxa`)}
                                    className="w-full px-3 py-2 border rounded-xl"
                                    placeholder="Insira a taxa de entrega"
                                    type="text"
                                />
                                <button
                                    type="button"
                                    onClick={() => removerLocalEntrega(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={adicionarLocalEntrega}
                            className="flex items-center text-white hover:text-gray-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Adicionar cidade
                        </button>
                    </div>

                    <button className="w-1/3 bg-green-500 text-white font-bold text-lg py-2 rounded-xl hover:bg-blue-700 mt-5">Cadastrar</button>
                    <h6 className="px-2 mt-3 text-white text-xs"><Link to='/' >
                                <span className=' underline'>Já tem um cadastro? Faça o login</span>
                            </Link></h6>
                </form>
            </div>
            <div className="w-1/2">
                <img
                    src={imagem1}
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

export default Cadastro;
