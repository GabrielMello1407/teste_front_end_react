'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Phone {
  model: string;
  brand: string;
  price: string;
  date: string;
  endDate: string;
  color: string;
  code: string;
}

const PhoneEditPage = () => {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { id } = useParams();
  useEffect(() => {
    const fetchPhone = async () => {
      console.log('ID capturado:', id);

      try {
        const response = await axios.get(
          `http://localhost:3000/api/phone/${id}`,
        );
        setPhone(response.data);
      } catch (error) {
        console.error('Erro!');
        toast.error('Erro ao carregar dados do celular.');
        router.push('/');
      }
    };
    fetchPhone();
  }, [id, router]);

  const updatePhone = async (updatedPhone: Phone) => {
    console.log('Atualizando telefone:', updatedPhone);
    try {
      const payload = {
        ...updatedPhone,
        date: new Date(updatedPhone.date).toISOString(),
        endDate: new Date(updatedPhone.endDate).toISOString(),
      };
      await axios.put(`http://localhost:3000/api/phone/${id}`, payload);
      console.log('Payload:', payload);
      toast.success('Celular atualizado com sucesso!');
      console.log('Redirecionando para a página inicial');
      router.push('/');
    } catch (error) {
      toast.error('Erro ao atualizar celular.');
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Formulário enviado');
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as Phone;

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

    updatePhone(data);
  };

  if (!phone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Editar produto</h1>
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
              defaultValue={phone.model}
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
              defaultValue={phone.brand}
            />
          </div>
          <div>
            <Label htmlFor="color" className="block font-medium mb-1">
              Cor
            </Label>
            <select
              id="color"
              name="color"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
              defaultValue={phone.color}
            >
              <option value="BLACK">BLACK</option>
              <option value="WHITE">WHITE</option>
              <option value="GOLD">GOLD</option>
              <option value="PINK">PINK</option>
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
              defaultValue={phone.price}
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
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
              defaultValue={phone.date ? phone.date.split('T')[0] : ''}
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
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
              defaultValue={phone.endDate ? phone.endDate.split('T')[0] : ''}
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
              defaultValue={phone.code}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <Button
            type="button"
            className="text-black font-roboto font-medium px-4 py-2 w-[87px] bg-white border rounded-sm border-black hover:bg-blue-600 hover:text-white"
            onClick={() => router.push('/')}
          >
            VOLTAR
          </Button>
          <Button
            type="submit"
            className="text-black px-4 py-2 hover:bg-blue-600 w-[87px] bg-white border rounded-sm border-black hover:text-white"
          >
            SALVAR
          </Button>
        </div>

        {message && <p className="text-center mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default PhoneEditPage;
