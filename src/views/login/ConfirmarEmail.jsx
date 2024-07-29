import React from 'react';
import iffood from "../../assets/iffood.png";

import { useNavigate } from 'react-router-dom';

function ConfirmarEmail() {

    const navigate = useNavigate();

    const handleSubmit = (e) =>{e.preventDefault();
        navigate('/nova-senha')
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

                    <form onSubmit={handleSubmit} className="w-full ">
                        <h2 className="text-5xl text-white font-bold mb-8 ">Verifique seu E-mail</h2>

                        <div className="flex space-x-4 justify-center" >
                            <div className="mb-8">

                                <input className="w-14 px-3 py-2 border rounded-xl text-xl" type="" id="" />
                            </div>
                            <div className="mb-8">

                                <input className="w-14 px-3 py-2 border rounded-xl text-xl" type="" id="" />
                            </div>
                            <div className="mb-8">

                                <input className="w-14 px-3 py-2 border rounded-xl text-xl" type="" id="" />
                            </div>
                            <div className="mb-8">

                                <input className="w-14 px-3 py-2 border rounded-xl text-xl" type="" id="" />
                            </div>
                        </div>





                        
                            <div className='flex justify-center'>
                                <button
                                    type='submit'
                                    style={{ backgroundColor: '#24A645' }} className="w-2/4  text-white py-2 rounded-xl text-xl hover:bg-blue-700 ">
                                    Enviar
                                </button>
                            </div>
                        

                        <div className='flex justify-center'>
                            <p className="px-3 mt-3 text-white text-xs ">Não tem uma Conta? <a className="underline" href="https://tailwindcss.com/docs/margin">Faça seu Cadastro.</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConfirmarEmail;
