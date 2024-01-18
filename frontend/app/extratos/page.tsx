"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Extratos() {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactionHistory = async (page: number) => {
    try {
      const response = await fetch(`http://localhost:3001/account/extrato?page=${page}`, {});

      if (!response.ok) {
        throw new Error('Erro ao obter o extrato da conta');
      }

      const { transactions, totalPages } = await response.json();

      setTransactionHistory(transactions);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Erro ao obter o extrato:', error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (transactionHistory.length === 0 && currentPage === totalPages && totalPages > 1) {
      setCurrentPage(1);
    }
  }, [transactionHistory, currentPage, totalPages]);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Link href="/" className="text-blue-500 hover:underline">
        Voltar para Home
      </Link>
      <br /><br />
      <h1 className="text-4xl font-bold mb-2 text-blue-500">Extrato</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        {transactionHistory.length > 0 ? (
          <table className="border-collapse w-full mb-8">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Tipo</th>
                <th className="py-2 px-4 border-b text-left">Valor</th>
                <th className="py-2 px-4 border-b text-left">Data</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction: any, index: number) => (
                <tr key={index} className={`${index === 0 ? 'bg-yellow-100' : ''} border-b`}>
                  <td className="py-2 px-4">{transaction.type}</td>
                  <td className="py-2 px-4">R$ {transaction.amount.toFixed(2).replace('.', ',')}</td>
                  <td className="py-2 px-4">{new Date(transaction.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma transação encontrada.</p>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Página Anterior
          </button>
          <p className="text-gray-600">Página {currentPage} de {totalPages}</p>
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima Página
          </button>
        </div>
      </div>
    </div>
  );
}
