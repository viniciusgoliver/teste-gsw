"use client";

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link';

export default function Deposito() {
  const [initialBalance, setInitialBalance] = useState('');
  const [result, setResult] = useState('');
  const router = useRouter();

  const handleDeposit = async () => {
    try {
      const cleanedValue = initialBalance.replace(/[^0-9.,]/g, '');
      const numericValue = cleanedValue.replace(',', '.');
      const response = await fetch('http://localhost:3001/account/deposito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          initialBalance: numericValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar depósito');
      }

      const resultData = await response.json();
      setResult(resultData.message);
    } catch (error) {
      console.error('Erro ao processar depósito:', error);
      setResult('Erro ao processar depósito. Por favor, tente novamente.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Link href="/" className="text-blue-500 hover:underline">
        Voltar para Home
      </Link>
      <br /><br />
      <h1 className="text-4xl font-bold mb-2 text-blue-500">Depósito</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <label className="block mb-4">
          Valor do Depósito:
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
          />
        </label>

        <button
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 w-full"
          onClick={handleDeposit}
        >
          Depositar
        </button>

        {result.includes('Erro') ? (
          <p className="mt-4 text-red-500 text-center">{result}</p>
        ) : (
          <p className="mt-4 text-green-500 text-center">{result}</p>
        )}
      </div>
    </div>
  );
}
