import * as yup from 'yup';

export const formSchema = yup.object().shape({
  cnpj: yup.string()
    .required('CNPJ é obrigatório')
    .matches(/^\d{14}$/, 'CNPJ deve ter 14 dígitos'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: yup.string().min(8, 'Senha deve ter pelo menos 8 caracteres').required('Senha é obrigatória'),
  categoria: yup.string().oneOf([
    'ITALIANO', 'CHINES', 'MEXICANO', 'JAPONES', 'FRANCES', 'BRASILEIRO',
    'AMERICANO', 'INDIANO', 'MEDITERRANEO', 'TURCO', 'GREGO', 'SUSHI',
    'PIZZARIA', 'HAMBURGUERIA', 'COMIDA_RAPIDA', 'CAFETERIA', 'BISTRO',
    'GASTRONOMIA_REGIONAL', 'RESTAURANTE_DE_FRUTOS_DO_MAR', 'STEAKHOUSE',
    'VEGETARIANO', 'VEGANO', 'ORGANICO', 'RAW_FOOD', 'SEM_GLUTEN',
    'SEM_LACTOSE', 'COMIDA_INTEGRAL', 'ALIMENTACAO_CONSCIENTE',
    'COMIDA_LOCAL_E_SAZONAL', 'COMIDA_ETICA', 'RESTAURANTES_DE_FERMENTADOS',
    'RESTAURANTES_DE_SUPERALIMENTOS'
  ], 'Categoria inválida').required('Categoria é obrigatória'),
});
