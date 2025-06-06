'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Sales() {
  const [sales, setSales] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('/api/sales');
        if (!response.ok) {
          throw new Error('Erro ao buscar vendas');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setSales(data);
        } else {
          throw new Error('Resposta inválida');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  // Função para formatar o valor em moeda brasileira
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <ProtectedRoute>
      <section>
        <div className={styles.dashboard}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Lista de Vendas</h1>
            <Link href="/sales/new">
              <button className={styles.btnNovo}>Nova Venda</button>
            </Link>
          </div>
          <ul className={styles.lista}>
            {sales.map((sale) => (
              <li key={sale._id} className={styles.titleLista}>
                {sale.client?.fullName || 'Cliente não especificado'} - {new Date(`${sale.saleDate}T00:00:00Z`).toLocaleDateString('pt-BR')} - {formatCurrency(sale.total)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ProtectedRoute>
  );
}