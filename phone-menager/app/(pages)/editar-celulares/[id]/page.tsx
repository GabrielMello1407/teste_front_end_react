'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const ProductCreatePage = () => {
  const { id } = useParams();
  const phoneId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Para verificar o carregamento

  useEffect(() => {
    if (phoneId) {
      fetchProduct(phoneId);
    }
  }, [phoneId]);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/phone?id=${productId}`,
      );
      setProduct(response.data);
      setLoading(false); // Carregamento concluído
    } catch (error) {
      toast.error('Erro ao carregar celular para edição!');
      setLoading(false); // Se houver erro, podemos parar o carregamento
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const newPhone = Object.fromEntries(formData) as any;

    const startDate = new Date(newPhone.startDate);
    const endDate = new Date(newPhone.endDate);

    if (startDate <= new Date('2018-12-25')) {
      toast.error('A data de início deve ser posterior a 25/12/2018.');
      return;
    }

    if (endDate <= startDate) {
      toast.error('A data de fim deve ser posterior à data de início.');
      return;
    }

    if (id) {
      await updatePhone(newPhone);
    } else {
      await createPhone(newPhone);
    }
  };

  const createPhone = async (newPhone: any) => {
    try {
      const payload = { ...newPhone, date: newPhone.startDate };
      await axios.post('http://localhost:3000/api/phone', payload);
      setMessage('Celular criado com sucesso!');
      router.push('/celulares');
    } catch (error) {
      setMessage('Erro ao criar celular');
      toast.error('Erro ao criar celular');
    }
  };

  const updatePhone = async (updatedPhone: any) => {
    try {
      const payload = { ...updatedPhone, date: updatedPhone.startDate };
      await axios.put(`http://localhost:3000/api/phone/${id}`, payload);
      setMessage('Celular atualizado com sucesso!');
      router.push('/celulares');
    } catch (error) {
      setMessage('Erro ao atualizar celular');
      toast.error('Erro ao atualizar celular');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold mb-6 font-museo">
        {id ? 'Editar Celular' : 'Cadastrar Novo Celular'}
      </h1>

      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium">
            Modelo
          </label>
          <input
            id="model"
            name="model"
            defaultValue={product?.model || ''}
            type="text"
            required
            className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">
            Preço
          </label>
          <input
            id="price"
            name="price"
            defaultValue={product?.price || ''}
            type="number"
            required
            className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="brand" className="block text-sm font-medium">
            Marca
          </label>
          <input
            id="brand"
            name="brand"
            defaultValue={product?.brand || ''}
            type="text"
            required
            className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium">
            Data de Início
          </label>
          <input
            id="startDate"
            name="startDate"
            defaultValue={product?.startDate || ''}
            type="date"
            required
            className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium">
            Data de Fim
          </label>
          <input
            id="endDate"
            name="endDate"
            defaultValue={product?.endDate || ''}
            type="date"
            required
            className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="color" className="block text-sm font-medium">
            Cor
          </label>
          <select
            id="color"
            name="color"
            defaultValue={product?.color || 'BLACK'}
            className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
          >
            <option value="BLACK">BLACK</option>
            <option value="WHITE">WHITE</option>
            <option value="GOLD">GOLD</option>
            <option value="PINK">PINK</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium">
            Código de Identificação
          </label>
          <input
            id="code"
            name="code"
            defaultValue={product?.code || ''}
            type="text"
            required
            className="mt-1 p-2 bg-gray-700 text-white rounded-md w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 p-3 rounded-md"
        >
          {id ? 'Atualizar Celular' : 'Cadastrar Celular'}
        </button>
      </form>

      {message && <div className="mt-6 text-white">{message}</div>}
    </div>
  );
};

export default ProductCreatePage;
