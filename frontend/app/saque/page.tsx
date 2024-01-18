"use client";

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link';

export default function Home() {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(false);

  const handleWithdraw = async () => {
    try {
      const cleanedValue = withdrawAmount.replace(/[^0-9.,]/g, '');
      const numericValue = cleanedValue.replace(',', '.');
      const response = await fetch('http://localhost:3001/account/saque', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: numericValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar saque');
      }

      const resultData = await response.json();
      setError(resultData.success);
      setResult(resultData.message);
      console.log(resultData);
    } catch (error) {
      console.error('Erro ao processar saque:', error);
      setResult('Erro ao processar saque. Por favor, tente novamente.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Link href="/" className="text-blue-500 hover:underline">
        Voltar para Home
      </Link>
      <br /><br />
      <h1 className="text-4xl font-bold mb-2 text-blue-500">Saque</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <label className="block mb-4">
          Valor do Saque:
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
        </label>

        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 w-full"
          onClick={handleWithdraw}
        >
          Sacar
        </button>

        {!error ? (
          <p className="mt-4 text-red-500 text-center">{result}</p>
        ) : (
          <p className="mt-4 text-green-500 text-center">{result}</p>
        )}
      </div>
    </div>
  );
}
