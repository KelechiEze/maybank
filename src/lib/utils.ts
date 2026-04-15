import React from 'react';

export const formatNumberWithCommas = (value: string) => {
  const cleanValue = value.replace(/,/g, '');
  if (!cleanValue) return '';
  const parts = cleanValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const allowOnlyNumbers = (value: string) => value.replace(/[^0-9]/g, '');
export const allowOnlyLetters = (value: string) => value.replace(/[^a-zA-Z\s]/g, '');

export const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void, withCommas = false) => {
  let val = allowOnlyNumbers(e.target.value);
  if (withCommas) {
    val = formatNumberWithCommas(val);
  }
  setter(val);
};

export const handleLetterInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
  const val = allowOnlyLetters(e.target.value);
  setter(val);
};
