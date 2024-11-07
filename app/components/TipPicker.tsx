'use client';

import React, { useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { useAppContext } from '../context/useGlobalState';
import {
  calculateTip,
  formatCurrency,
  getPaymentBreakdown,
} from '../utils/helpers';
import Button from './Button';
import CustomTipForm from './CustomTipForm';

const TIPS_ARRAY = [15, 20, 25, 30];

export default function TipPicker() {
  const { paymentInfo, setPaymentInfo } = useAppContext();
  const [tip, setTip] = useState(0);
  const [selectedTipPercentage, setSelectedTipPercentage] = useState<
    number | null
  >(null);
  const [customTip, setCustomTip] = useState<number | 'custom' | null>(null);
  const [showCustomTipForm, setShowCustomTipForm] = useState(false);
  const router = useRouter();

  const amount = paymentInfo?.amount || 0;
  const { tax, fee, total } = useMemo(
    () => getPaymentBreakdown(amount, tip),
    [amount, tip],
  );

  useEffect(() => {
    if (!amount) {
      router.push('/payment');
    }
  });

  useEffect(() => {
    if (amount && selectedTipPercentage) {
      setTip(calculateTip(amount, selectedTipPercentage));
    }
  }, [setTip, amount, selectedTipPercentage]);

  const handleTipClick = (value: number) => {
    if (selectedTipPercentage === value) {
      setSelectedTipPercentage(null);
      setTip(0);
    } else {
      setSelectedTipPercentage(value);
      setCustomTip(null);
    }
  };

  const handleCustomTipClick = (value: number | 'custom') => {
    if (customTip === value) {
      setCustomTip(null);
      setTip(0);
      setShowCustomTipForm(false);
    } else {
      setCustomTip(value);
      setSelectedTipPercentage(null);
      setTip(0);
      setShowCustomTipForm(true);
    }
  };

  const onBtnClick = () => {
    setPaymentInfo((prevState) => ({ ...prevState, fee, tip, tax, total }));
    router.push('/payment/confirmation');
  };

  return (
    <div className="justify-center text-center">
      <h3 className="text-lg font-raleway font-semibold md:text-2xl tracking-wider text-start mb-5">
        Select the tip amount:
      </h3>

      <div className="grid grid-cols-[130px_130px] gap-[30px] mx-auto mb-5 justify-center sm:grid-cols-[130px_130px_130px] md:flex md:items-center md:justify-center">
        {TIPS_ARRAY.map((tipPercentage) => (
          <div
            key={tipPercentage}
            onClick={() => handleTipClick(tipPercentage)}
            className={clsx(
              'flex flex-col justify-between px-4 py-5 font-semibold text-base md:text-lg h-28 w-32 border border-accentColor rounded-2xl transition-colors cursor-pointer leading-tight hover:bg-accentColor hover:text-mainLightColor hover:shadow-2xl',
              selectedTipPercentage === tipPercentage
                ? 'bg-cardColor text-mainLightColor'
                : 'bg-mainLightColor text-cardColor',
            )}
          >
            <p>{tipPercentage}%</p>
            {selectedTipPercentage === tipPercentage && (
              <span className="inline-block text-xs p-1 rounded-md text-mainDarkColor bg-bgColor">
                {formatCurrency(tip)}
              </span>
            )}
          </div>
        ))}
        <div
          onClick={() => handleCustomTipClick('custom')}
          className={clsx(
            'flex flex-col justify-between px-4 py-5 font-semibold text-base md:text-lg h-28 w-32 border border-accentColor rounded-2xl transition-colors cursor-pointer  leading-tight hover:bg-accentColor hover:text-mainLightColor hover:shadow-2xl',
            customTip === 'custom'
              ? 'bg-cardColor text-mainLightColor'
              : 'bg-mainLightColor text-cardColor',
          )}
        >
          <p>Custom</p>
          {tip !== 0 && customTip && (
            <span className="inline-block text-xs p-1 rounded-md text-mainDarkColor bg-bgColor">
              {formatCurrency(tip)}
            </span>
          )}
        </div>
      </div>
      {customTip && (
        <CustomTipForm
          setTip={setTip}
          showCustomTipForm={showCustomTipForm}
          setShowCustomTipForm={setShowCustomTipForm}
        />
      )}

      <table className="text-sm sm:text-lg sm:max-w-full rounded-2xl border border-accentColor flex flex-col justify-center md:max-w-[780px] mx-auto px-4 py-5 mb-5 bg-bgColor">
        <tbody>
          <tr className="border-none flex justify-between mb-2.5">
            <td className="border-none">Amount due</td>
            <td className="border-none">{formatCurrency(amount)}</td>
          </tr>
          <tr className="border-none flex justify-between mb-2.5">
            <td className="border-none">Tips</td>
            <td className="border-none">{formatCurrency(tip)}</td>
          </tr>
          <tr className="border-none flex justify-between mb-2.5">
            <td className="border-none">Tax (GST/HST)</td>
            <td className="border-none">{formatCurrency(tax)}</td>
          </tr>
          <tr className="border-none flex justify-between mb-2.5">
            <td className="border-none">Processing Fee</td>
            <td className="border-none">{formatCurrency(fee)}</td>
          </tr>
          <tr className="border-none flex justify-between mb-2.5 text-base sm:text-lg md:text-xl font-semibold">
            <td className="border-none">Total</td>
            <td className="border-none">{formatCurrency(total)}</td>
          </tr>
        </tbody>
      </table>

      <div className="w-full flex justify-center">
        <Button onClick={onBtnClick} type="button">
          Next
        </Button>
      </div>
    </div>
  );
}
