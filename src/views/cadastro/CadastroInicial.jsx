import React from 'react';
import { useNavigate } from 'react-router-dom';
import iffood from "../../assets/iffood.png";
import imagem1 from "../../assets/imagem1.png";

function Cadastro() {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/confirmar-cadastro')
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex flex-col items-center justify-center ">
                <div className="mb-8">
                    <img
                        src={iffood}
                        alt="If Food Logo"
                        className="w-40 h-40 object-contain"
                    />
                </div>
                <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg w-5/6">
                    <h2 className="text-2xl font-bold mb-6">Cadastro</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Nome</label>
                        <input className="w-full px-3 py-2 border rounded-xl" type="text" id="name" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input className="w-full px-3 py-2 border rounded-xl" type="email" id="email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Senha</label>
                        <input className="w-full px-3 py-2 border rounded-xl" type="email" id="email" />
                    </div>


                    <button
                        type='submit'
                        className="w-1/3 bg-green-500 text-white font-bold text-lg py-2 rounded-xl hover:bg-blue-700">
                        Cadastrar
                    </button>
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
