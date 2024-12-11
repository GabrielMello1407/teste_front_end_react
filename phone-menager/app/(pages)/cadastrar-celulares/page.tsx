'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ProductForm from '@/components/productForm';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';

const ProductCreatePage = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const createPhone = async (newPhone: any) => {
    try {
      const payload = { ...newPhone, date: newPhone.startDate };
      const response = await axios.post(
        'http://localhost:3000/api/phone',
        payload,
      );
      setMessage('Celular criado com sucesso!');
      router.push('/celulares');
    } catch (error) {
      setMessage('Erro ao criar celular');
    }
  };

  const handleFormSubmit = (data: any) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (startDate <= new Date('2018-12-25')) {
      toast.error('A data de início deve ser posterior a 25/12/2018.');
      return;
    }

    if (endDate <= startDate) {
      toast.error('A data de fim deve ser posterior à data de início.');
      return;
    }

    createPhone(data);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl justify-start items-start p-4">
        Cadastrar Celular
      </h1>
      <Card className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <ProductForm onSubmit={handleFormSubmit} />
        {message && (
          <div className="mt-6 text-white text-center">{message}</div>
        )}
      </Card>
    </div>
  );
};

export default ProductCreatePage;
