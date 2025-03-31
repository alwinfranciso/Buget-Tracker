import { Currency, currencies } from '../types';

const API_KEY = 'YOUR_API_KEY'; // Note: In production, this should be an environment variable

export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) return amount;
  
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const data = await response.json();
    const rate = data.rates[toCurrency];
    return amount * rate;
  } catch (error) {
    console.error('Error converting currency:', error);
    return amount;
  }
}

export function formatCurrency(amount: number, currency: string): string {
  const currencyInfo = currencies.find(c => c.code === currency);
  if (!currencyInfo) return `$${amount.toFixed(2)}`;

  return `${currencyInfo.symbol}${amount.toFixed(2)}`;
}

export function getCurrencySymbol(currencyCode: string): string {
  const currency = currencies.find(c => c.code === currencyCode);
  return currency?.symbol || '$';
}