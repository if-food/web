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

import { storage } from "../../services/firebase";  // Importando o Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Funções do Firebase Storage

const Cadastro = () => {
    const [logoPreviewUrl, setLogoPreviewUrl] = useState(null);  // URL para a pré-visualização do logo
    const [bannerPreviewUrl, setBannerPreviewUrl] = useState(null); // URL para a pré-visualização do banner

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
        logoUrl: '', // Novo campo para armazenar a URL da imagem do Firebase
        bannerUrl: '' // Novo campo para a URL do banner
    });

    const [selectedLogo, setSelectedLogo] = useState(null);  // Estado para armazenar o arquivo de logo
    const [selectedBanner, setSelectedBanner] = useState(null); // Estado para o arquivo de banner

    function convertToBoolean(value) {
        return value === "on";
    }

    const handleSave = async () => {
        try {
            // Convertendo valores dos checkboxes para booleanos
            formData.aceitaPix = convertToBoolean(formData.aceitaPix);
            formData.aceitaCartaoCredito = convertToBoolean(formData.aceitaCartaoCredito);
            formData.aceitaCartaoDebito = convertToBoolean(formData.aceitaCartaoDebito);
            formData.aceitaDinheiro = convertToBoolean(formData.aceitaDinheiro);
            formData.aceitaValeRefeicao = convertToBoolean(formData.aceitaValeRefeicao);
            formData.aceitaValeAlimentacao = convertToBoolean(formData.aceitaValeAlimentacao);

            // Upload da logo, se houver uma nova imagem selecionada
            if (selectedLogo) {
                const logoRef = ref(storage, `restaurantes/${id}/logo`);
                const logoSnapshot = await uploadBytes(logoRef, selectedLogo);
                formData.logoUrl = await getDownloadURL(logoSnapshot.ref); // URL do logo no Firebase

                console.log(logoRef)
                console.log(selectedLogo)
                console.log(formData.logoUrl)
            }

            // Upload do banner, se houver uma nova imagem selecionada
            if (selectedBanner) {
                const bannerRef = ref(storage, `restaurantes/${id}/banner`);
                const bannerSnapshot = await uploadBytes(bannerRef, selectedBanner);
                formData.bannerUrl = await getDownloadURL(bannerSnapshot.ref); // URL do banner no Firebase
            }

            // Garantindo que as URLs estão no formData
            formData.logoUrl = formData.logoUrl || ''; // Ou alguma URL padrão
            formData.bannerUrl = formData.bannerUrl || ''; // Ou alguma URL padrão

            // Envio dos dados ao backend
            await axios.put(`http://localhost:8080/api/restaurante/${id}`, formData);

            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o perfil', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (e.target.name === 'logo') {
            setSelectedLogo(file);  // Atualiza o arquivo de logo selecionado
            setLogoPreviewUrl(URL.createObjectURL(file)); // Cria a URL para pré-visualização do logo
        } else if (e.target.name === 'banner') {
            setSelectedBanner(file);  // Atualiza o arquivo de banner selecionado
            setBannerPreviewUrl(URL.createObjectURL(file)); // Cria a URL para pré-visualização do banner
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/restaurante/?restauranteId=${id}`);
            reset({
                nomeFantasia: response.data.nomeFantasia,
                razaoSocial: response.data.razaoSocial,
                cnpj: response.data.cnpj,
                categoria: response.data.categoria,
                rua: response.data.rua,
                bairro: response.data.bairro,
                numero: response.data.numero,
                cidade: response.data.cidade,
                estado: response.data.estado,
                cep: response.data.cep,
                aceitaPix: response.data.aceitaPix,
                aceitaCartaoCredito: response.data.aceitaCartaoCredito,
                aceitaCartaoDebito: response.data.aceitaCartaoDebito,
                aceitaDinheiro: response.data.aceitaDinheiro,
                aceitaValeRefeicao: response.data.aceitaValeRefeicao,
                aceitaValeAlimentacao: response.data.aceitaValeAlimentacao,
                logoUrl: response.data.logoUrl,
                bannerUrl: response.data.bannerUrl
            });
        } catch (error) {
            console.error('Erro ao buscar os dados', error);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1 overflow-hidden">
                <ParceirosSidebar />
                <div className="w-full flex flex-col items-center justify-center overflow-y-auto">
                    <div className="mb-4 mt-4">
                        <img src={iffood} alt="If Food Logo" className="w-52 h-52 object-contain" />
                    </div>
                    <div className="p-1 rounded-lg shadow-lg w-5/6 overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-2 text-white">Cadastro</h2>

                        <div className="col-span-full">
                            <label htmlFor="logo" className="block text-sm font-medium leading-6 text-white">Adicione uma foto</label>
                            <div className="mt-1 flex items-center gap-x-3 mb-4">
                                <input type="file" name="logo" onChange={handleFileChange} />
                                {logoPreviewUrl && <img src={logoPreviewUrl} alt="Logo Preview" className="w-32 h-32 object-cover" />}
                            </div>
                        </div>

                        <div className="mb-4 bg-white">
                            <label className="block text-white mb-2" htmlFor="banner">Adicione uma foto de capa</label>
                            <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <input type="file" name="banner" onChange={handleFileChange} />
                                {bannerPreviewUrl && <img src={bannerPreviewUrl} alt="Banner Preview" className="w-full h-32 object-cover" />}
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
