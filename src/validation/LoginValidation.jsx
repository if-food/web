import * as yup from 'yup';

export const formSchema = yup.object().shape({
 
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: yup.string().min(8, 'Senha deve ter pelo menos 8 caracteres').required('Senha é obrigatória'),
 
});