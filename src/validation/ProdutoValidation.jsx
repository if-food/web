import * as yup from 'yup';

export const itemSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  price: yup.number().required('Preço é obrigatório').positive('Preço deve ser positivo'),
  description: yup.string().required('Descrição é obrigatória'),
//   image: yup.mixed().required('Imagem é obrigatória')
});