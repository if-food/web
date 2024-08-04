import * as yup from 'yup';

export const formSchema = yup.object().shape({
 

  senha: yup.string().min(8, 'Senha deve ter pelo menos 8 caracteres').required('Senha é obrigatória'),
 
});