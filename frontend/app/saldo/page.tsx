"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Saldo() {
  const [saldo, setSaldo] = useState('');
  const [error, setError] = useState(false);

  const fetchSaldo = async () => {
    try {
      const response = await fetch('http://localhost:3001/account/saldo', {});

      if (!response.ok) {
        setError(true);
        throw new Error('Erro ao obter o saldo da conta');
      }

      const { balance } = await response.json();
      const saldo = balance;
      setSaldo(saldo);
      setError(false);
    } catch (error) {
      setError(true);
      console.error('Erro ao obter o saldo:', error);
    }
  };

  useEffect(() => {
    fetchSaldo();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Link href="/" className="text-blue-500 hover:underline">
        Voltar para Home
      </Link>
      <br /><br />
      <h1 className="text-4xl font-bold mb-2 text-blue-500">Saldo</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        {!error ? (
          <p className="text-2xl">Saldo Atual: R$ {saldo}</p>
        ) : (
          <p>Você não possui saldo na conta.</p>
        )}
      </div>
    </div>
  );
}
