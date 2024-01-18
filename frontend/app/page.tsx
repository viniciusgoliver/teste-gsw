"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-2 text-blue-500">Bem-vindo ao Teste</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <MenuLink href="/saque" label="Saque" />
          <MenuLink href="/deposito" label="Depósito" />
          <MenuLink href="/extratos" label="Extrato" />
          <MenuLink href="/saldo" label="Saldo" />
        </div>
      </div>
    </div>
  );
}

type MenuLinkProps = {
  href: string;
  label: string;
};

const MenuLink = ({ href, label }: MenuLinkProps) => (
  <Link href={href} className="block bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-700 text-center">
    {label}
  </Link>
);
