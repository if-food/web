import * as yup from 'yup';

export const formSchema = yup.object().shape({
  nomeResponsavel: yup.string().required('Nome do responsável é obrigatório'),
  nomeRestaurante: yup.string().required('Nome do restaurante é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  cnpj: yup.string('CNPJ inválido').required('CNPJ é obrigatório'),
  senha: yup.string().min(8, 'Senha deve ter pelo menos 8 caracteres').required('Senha é obrigatória'),
  segmento: yup.string().required('Segmento é obrigatório'),
  logradouro: yup.string().required('Logradouro é obrigatório'),
  bairro: yup.string().required('Bairro é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatória'),
  uf: yup.string().required('UF é obrigatório').max(2, 'UF deve ter no máximo 2 caracteres'),
  cep: yup.string().required('CEP é obrigatório').matches(/^\d{5}-\d{3}$/, 'CEP deve estar no formato 12345-678'),
});