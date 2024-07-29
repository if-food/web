import React from 'react';
import iffood from "../../assets/iffood.png";
import Verificado from "../../assets/Verificado.png";
import { Link } from 'react-router-dom';



function RecuperacaoSenha() {
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

                    <div className="w-30 flex items-center justify-center">
                        <img
                            src={Verificado}
                            alt="verificado"
                            className="object-contain"
                        />
                    </div>

                    <div className="w-full">
                        <h2 className="text-6xl text-white font-bold my-8 flex justify-center">Senha Atualizada</h2>

                        <h4 className="text-xl text-white font-bold my-8 flex justify-center">Efetue seu Login.</h4>


                        <Link className="flex justify-center" to='/'><button style={{ backgroundColor: '#24A645' }} className="w-2/4 my-10 text-white py-2 rounded-xl text-2xl hover:bg-blue-700 ">Login</button></Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecuperacaoSenha;
