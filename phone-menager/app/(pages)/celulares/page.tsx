'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash, Edit } from 'lucide-react';
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

const PhonePage = () => {
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
      setIsOpen(false); // Fecha o modal após a exclusão
    } catch (error) {
      toast.error('Erro ao deletar produto!');
    }
  };

  const handleDeleteConfirmation = (id: string) => {
    setSelectedProduct(id);
    setIsOpen(true); // Abre o modal de confirmação
  };

  const handleCloseDialog = () => {
    setIsOpen(false); // Fecha o modal
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex-grow p-4">
        <h1 className="text-xl font-semibold mb-4">Lista de Produtos</h1>

        <div className="overflow-x-auto bg-gray-800 shadow-md rounded-lg">
          {products.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Código</TableHead>
                  <TableHead className="text-white">Modelo</TableHead>
                  <TableHead className="text-white">Marca</TableHead>
                  <TableHead className="text-white">Cor</TableHead>
                  <TableHead className="text-white">Preço</TableHead>
                  <TableHead className="text-white">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="text-[#00AEEC]">
                      {product.code}
                    </TableCell>
                    <TableCell className="text-[#00AEEC]">
                      {product.model}
                    </TableCell>
                    <TableCell className="text-[#00AEEC]">
                      {product.brand}
                    </TableCell>
                    <TableCell className="text-[#00AEEC]">
                      {product.color}
                    </TableCell>
                    <TableCell className="text-[#00AEEC]">
                      R${product.price}
                    </TableCell>
                    <TableCell className="flex justify-center space-x-2">
                      <Link href={`/editar-celulares/${product.id}`}>
                        <Button className="text-blue-500 hover:text-blue-700">
                          <Edit />
                        </Button>
                      </Link>
                      <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => handleDeleteConfirmation(product.id)}
                            variant="destructive"
                            className="text-white-500 hover:text-red-700"
                          >
                            <Trash />
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

export default PhonePage;
