import * as yup from 'yup';

export const formSchema = yup.object().shape({
 
  email: yup.string().email('Email inválido').required('Email é obrigatório'),

 
});