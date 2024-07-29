import React from 'react';
import iffood from "../../assets/iffood.png";
import { useNavigate } from 'react-router-dom';



function RecuperacaoSenha() {

    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate('/')
    }

    return (
        <div className="h-screen  flex items-center justify-center">
            <div className="flex w-full max-w-6xl">
                <div className="w-1/2 flex items-center justify-center">
                    <img
                        src={iffood}
                        alt="Placeholder"
                        className="object-contain w-80"
                    />
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center  p-8 rounded-lg shadow-lg">

                    <form onSubmit={handleSubmit} className="w-full">
                        <h2 className="text-5xl text-white font-bold mb-8">Nova Senha</h2>

                        <div className="mb-8">
                            <label className="block text-white mb-2 text-xl" htmlFor="email">Senha</label>
                            <input className="w-full px-3 py-2 border rounded-xl text-xl" type="email" id="email" Placeholder="Insira sua Senha" />
                        </div>




                        <button
                            type='submit'
                            style={{ backgroundColor: '#24A645' }}
                            className="w-2/4  text-white py-2 rounded-xl text-xl hover:bg-blue-700">
                            Confirmar
                        </button>

                        <p className="px-3 mt-3 text-white text-xs ">Não tem uma Conta? <a className="underline" href="https://tailwindcss.com/docs/margin">Faça seu Cadastro.</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RecuperacaoSenha;
