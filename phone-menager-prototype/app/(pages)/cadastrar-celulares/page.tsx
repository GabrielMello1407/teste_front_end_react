'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NewPhone {
  model: string;
  brand: string;
  price: string;
  date: string;
  endDate: string;
  color: string;
  code: string;
}
const PhoneCreatePage = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const createPhone = async (newPhone: NewPhone) => {
    try {
      const payload = {
        ...newPhone,
        date: new Date(newPhone.date).toISOString(),
        endDate: new Date(newPhone.endDate).toISOString(),
      };
      const response = await axios.post(
        'http://localhost:3000/api/phone',
        payload,
      );
      setMessage('Celular criado com sucesso!');
      router.push('/');
    } catch (error) {
      setMessage('Erro ao criar celular');
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as NewPhone;

    const startDate =
      typeof data.date === 'string' ? new Date(data.date) : null;
    const endDate =
      typeof data.endDate === 'string' ? new Date(data.endDate) : null;

    if (!startDate || !endDate) {
      toast.error('Datas inválidas.');
      return;
    }
    if (!data.code || data.code.trim() === '') {
      toast.error('O campo código é obrigatório.');
      return;
    }

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Detalhes do produto</h1>
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleFormSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="model" className="block font-medium mb-1">
              Modelo
            </Label>
            <Input
              type="text"
              id="model"
              name="model"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
              placeholder="XT2041-1"
            />
          </div>
          <div>
            <Label htmlFor="brand" className="block font-medium mb-1">
              Marca
            </Label>
            <Input
              type="text"
              id="brand"
              name="brand"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
              placeholder="Motorola"
            />
          </div>
          <div>
            <Label htmlFor="color" className="block font-medium mb-1">
              Cor
            </Label>
            <select
              id="color"
              name="color"
              className="border border-gray-300 rounded px-3 py-2 w-full text-gray-400"
              required
            >
              <option value="BLACK" className="text-black">
                BLACK
              </option>
              <option value="WHITE" className="text-black">
                WHITE
              </option>
              <option value="GOLD" className="text-black">
                GOLD
              </option>
              <option value="PINK" className="text-black">
                PINK
              </option>
            </select>
          </div>
          <div>
            <Label htmlFor="price" className="block font-medium mb-1">
              Preço
            </Label>
            <Input
              type="number"
              id="price"
              name="price"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
              placeholder="1.400,00"
            />
          </div>
          <div>
            <Label htmlFor="date" className="block font-medium mb-1">
              Início das vendas
            </Label>
            <Input
              type="date"
              id="date"
              name="date"
              className="border border-gray-300 rounded px-3 py-2 w-full text-gray-400"
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="block font-medium mb-1">
              Fim das vendas
            </Label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              className="border border-gray-300 rounded px-3 py-2 w-full text-gray-400"
              required
            />
          </div>
          <div>
            <Label htmlFor="code" className="block font-medium mb-1">
              Código
            </Label>
            <Input
              type="text"
              id="code"
              name="code"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <Button
            type="button"
            className="text-black font-roboto font-medium px-4 py-2 w-[87px] bg-white hover:bg-blue-600 hover:text-white border rounded-sm border-black"
            onClick={() => router.push('/')}
          >
            VOLTAR
          </Button>
          <Button
            type="submit"
            className="text-black px-4 py-2  border-black hover:bg-blue-600 w-[87px] hover:text-white bg-white border rounded-sm"
          >
            SALVAR
          </Button>
        </div>

        {message && <p className="text-center mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default PhoneCreatePage;
