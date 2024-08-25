import * as yup from 'yup';

export const categorySchema = yup.object().shape({
  categoryName: yup.string().required('O nome da categoria é obrigatório.'),
  description: yup.string(),
});
