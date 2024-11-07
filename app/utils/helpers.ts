import { serviceType } from '../context/useGlobalState';

export const calculatePrice = (selectedProcedure: serviceType | null) => {
  let price;

  switch (selectedProcedure) {
    case 'Small Tattoo':
      price = 100;
      break;
    case 'Large Tattoo':
      price = 120;
      break;
    case 'Permanent Makeup':
      price = 100;
      break;
    case 'Touch-up':
      price = 20;
      break;
    default:
      price = 0;
  }

  return price;
};

export const pickDuration = (selectedProcedure: serviceType | null) => {
  let duration;

  switch (selectedProcedure) {
    case 'Small Tattoo':
      duration = 60;
      break;
    case 'Large Tattoo':
      duration = 120;
      break;
    case 'Permanent Makeup':
      duration = 60;
      break;
    case 'Touch-up':
      duration = 30;
      break;
    default:
      duration = 60;
  }

  return duration;
};

export const calculateTip = (amount: number, percentage: number) => {
  switch (percentage) {
    case 15:
      return Number((amount * 0.15).toFixed(2));
    case 20:
      return Number((amount * 0.2).toFixed(2));
    case 25:
      return Number((amount * 0.25).toFixed(2));
    case 30:
      return Number((amount * 0.3).toFixed(2));
    default:
      return 0;
  }
};

export const formatCurrency = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'CAD' });

export const calculateStripeFee = (amount: number) => {
  const percentageFee = 0.029;
  const flatFee = 0.3;

  const fee = amount * percentageFee + flatFee;
  return Number(fee.toFixed(2));
};

export const getDepositBreakdown = (service: serviceType | null) => {
  const amount = calculatePrice(service) || 0;
  const tax = Number((amount * 0.13).toFixed(2)) || 0;
  const fee = calculateStripeFee(amount + tax);
  const total = Number((tax + amount + fee).toFixed(2));

  return {
    amount,
    tax,
    fee,
    total,
  };
};

export const getPaymentBreakdown = (amount: number, tip: number) => {
  const tax = Number((amount * 0.13).toFixed(2)) || 0;
  const fee = calculateStripeFee(amount + tax);
  const total = Number((tax + amount + fee + tip).toFixed(2));

  return {
    tax,
    fee,
    total,
  };
};
