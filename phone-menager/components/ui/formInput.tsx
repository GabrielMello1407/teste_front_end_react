import React from 'react';
import { Input } from '@/components/ui/input';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  register: any;
  errors: any;
  options?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  register,
  errors,
  options,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-white">
      {label}
    </label>
    {type === 'select' ? (
      <select
        id={id}
        {...register(id)}
        className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
      >
        {options}
      </select>
    ) : (
      <Input
        id={id}
        type={type}
        {...register(id)}
        className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
      />
    )}
    {errors[id] && (
      <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>
    )}
  </div>
);

export default FormInput;
