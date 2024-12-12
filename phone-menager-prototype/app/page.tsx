'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';

import { IoMdPhonePortrait } from 'react-icons/io';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/phone');
      setProducts(response.data);
    } catch (error) {
      toast.error('Erro ao buscar produtos!');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/phone/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success('Produto deletado com sucesso!');
      setIsOpen(false);
    } catch (error) {
      toast.error('Erro ao deletar produto!');
    }
  };

  const handleDeleteConfirmation = (id: string) => {
    setSelectedProduct(id);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="flex flex-col w-screen mx-auto mt-8 p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-black">Produtos</h1>
          <Link href={'cadastrar-celulares'}>
            <Button
              variant={'default'}
              className="bg-[##DAE3ED] 
            border-black border rounded-md hover:bg-[#054A91] hover:text-white text-black font-roboto font-medium "
            >
              +<IoMdPhonePortrait /> ADICIONAR
            </Button>
          </Link>
        </div>

        <div className="overflow-hidden border border-black shadow-sm rounded-md">
          {products.length > 0 ? (
            <Table>
              <TableHeader className="bg-white">
                <TableRow>
                  <TableHead className="text-black text-center font-roboto font-medium">
                    Código
                  </TableHead>
                  <TableHead className="text-black text-center font-roboto font-medium text-[14px]">
                    Modelo
                  </TableHead>
                  <TableHead className="text-black text-center font-roboto font-medium text-[14px]">
                    Preço
                  </TableHead>
                  <TableHead className="text-black text-center font-roboto font-medium text-[14px]">
                    Marca
                  </TableHead>
                  <TableHead className="text-black text-center font-roboto font-medium text-[14px]">
                    Cor
                  </TableHead>
                  <TableHead className="text-black text-center text-[14px]">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-100">
                    <TableCell className="text-black text-center">
                      {product.code}
                    </TableCell>
                    <TableCell className="text-black text-center">
                      {product.model}
                    </TableCell>
                    <TableCell className="text-black text-center">
                      R$ {product.price}
                    </TableCell>
                    <TableCell className="text-black text-center">
                      {product.brand}
                    </TableCell>
                    <TableCell className="text-black text-center">
                      {product.color}
                    </TableCell>
                    <TableCell className="text-center space-x-2 flex justify-center">
                      <Link href={`/editar-celulares/${product.id}`}>
                        <Button className="bg- text-black hover:bg-[#054A91] hover:text-white">
                          <Pencil size={24} />
                        </Button>
                      </Link>
                      <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => handleDeleteConfirmation(product.id)}
                            className="text-black bg- hover:text-white hover:bg-[#054A91]"
                          >
                            <FaTrash />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>Confirmar Exclusão</DialogTitle>
                          <p>
                            Você tem certeza que deseja excluir este produto?
                          </p>
                          <DialogFooter>
                            <Button
                              variant="secondary"
                              onClick={handleCloseDialog}
                            >
                              Cancelar
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => deleteProduct(selectedProduct!)}
                            >
                              Confirmar Exclusão
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center py-4">Nenhum produto encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
