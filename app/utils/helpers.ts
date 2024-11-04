type selectedProcedure =
  | 'small-tattoo'
  | 'large-tattoo'
  | 'permanent'
  | 'touch-up'
  | null;

export const switchName = (selectedProcedure: selectedProcedure) => {
  let procedureName;

  switch (selectedProcedure) {
    case 'small-tattoo':
      procedureName = 'Small Tattoo';
      break;
    case 'large-tattoo':
      procedureName = 'Large Tattoo';
      break;
    case 'permanent':
      procedureName = 'Permanent Makeup';
      break;
    case 'touch-up':
      procedureName = 'Touch-up';
      break;
    default:
      procedureName = 'Small Tattoo';
  }

  return procedureName;
};

export const calculatePrice = (selectedProcedure: selectedProcedure) => {
  let price;

  switch (selectedProcedure) {
    case 'small-tattoo':
      price = 100;
      break;
    case 'large-tattoo':
      price = 120;
      break;
    case 'permanent':
      price = 100;
      break;
    case 'touch-up':
      price = 20;
      break;
    default:
      price = 0;
  }

  return price;
};

export const pickDuration = (selectedProcedure: selectedProcedure) => {
  let duration;

  switch (selectedProcedure) {
    case 'small-tattoo':
      duration = 60;
      break;
    case 'large-tattoo':
      duration = 120;
      break;
    case 'permanent':
      duration = 60;
      break;
    case 'touch-up':
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
