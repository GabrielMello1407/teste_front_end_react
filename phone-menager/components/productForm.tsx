import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import FormInput from './ui/formInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const productSchema = z.object({
  model: z
    .string()
    .min(2, { message: 'O nome do modelo deve ter pelo menos 2 caracteres.' })
    .max(255, {
      message: 'O nome do modelo não pode ter mais que 255 caracteres.',
    })
    .trim(),
  price: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: 'O preço deve ser um número positivo maior que 0.',
    }),
  brand: z
    .string()
    .min(2, { message: 'A marca deve ter pelo menos 2 caracteres.' })
    .max(255, { message: 'A marca não pode ter mais que 255 caracteres.' })
    .trim(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'A data de início deve estar no formato yyyy-MM-dd.',
  }),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'A data de fim deve estar no formato yyyy-MM-dd.',
  }),
  color: z.enum(['BLACK', 'WHITE', 'GOLD', 'PINK'], {
    errorMap: () => ({ message: 'Cor inválida' }),
  }),
  code: z
    .string()
    .length(8, { message: 'O código de identificação deve ter 8 caracteres.' })
    .trim()
    .toUpperCase(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <FormInput
        id="model"
        label="Modelo"
        register={register}
        errors={errors}
      />
      <FormInput
        id="price"
        label="Preço"
        type="number"
        register={register}
        errors={errors}
      />
      <FormInput id="brand" label="Marca" register={register} errors={errors} />
      <FormInput
        id="startDate"
        label="Início das vendas"
        type="date"
        register={register}
        errors={errors}
      />
      <FormInput
        id="endDate"
        label="Fim das vendas"
        type="date"
        register={register}
        errors={errors}
      />

      <div className="mb-4">
        <label htmlFor="color" className="block text-sm font-medium text-white">
          Cor
        </label>
        <Select
          value={watch('color') as 'BLACK' | 'WHITE' | 'GOLD' | 'PINK'} // Forçar o tipo correto
          onValueChange={(value: 'BLACK' | 'WHITE' | 'GOLD' | 'PINK') =>
            setValue('color', value)
          } // Tipar explicitamente o valor
        >
          <SelectTrigger className="w-full p-2 bg-gray-700 text-white rounded-md">
            <SelectValue placeholder="Selecione a cor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BLACK">BLACK</SelectItem>
            <SelectItem value="WHITE">WHITE</SelectItem>
            <SelectItem value="GOLD">GOLD</SelectItem>
            <SelectItem value="PINK">PINK</SelectItem>
          </SelectContent>
        </Select>
        {errors.color && (
          <p className="text-red-500 text-xs mt-1">{errors.color.message}</p>
        )}
      </div>

      <FormInput
        id="code"
        label="Código de Identificação"
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 p-3 rounded-md"
      >
        Cadastrar Celular
      </Button>
    </form>
  );
};

export default ProductForm;
