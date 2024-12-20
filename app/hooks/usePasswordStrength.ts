import { useState } from 'react';

const usePasswordStrength = () => {
  const [passwordStrength, setPasswordStrength] = useState('');
  const [strengthColor, setStrengthColor] = useState('');

  const validatePasswordStrength = (password: string) => {
    let strength = '';
    let strengthLevel = 0;
    let color = '';

    if (password?.length >= 8) strengthLevel++;
    if (/[a-z]/.test(password)) strengthLevel++;
    if (/[A-Z]/.test(password)) strengthLevel++;
    if (/[0-9]/.test(password)) strengthLevel++;
    if (/[\W_]/.test(password)) strengthLevel++;

    switch (strengthLevel) {
      case 5:
        strength = 'Very Strong';
        color = 'green';
        break;
      case 4:
        strength = 'Strong';
        color = 'blue';
        break;
      case 3:
        strength = 'Medium';
        color = 'orange';
        break;
      case 2:
        strength = 'Weak';
        color = 'red';
        break;
      case 1:
        strength = 'Weak';
        color = 'red';
        break;
      default:
        strength = '';
        break;
    }

    setPasswordStrength(strength);
    setStrengthColor(color);
  };

  return {
    strengthColor,
    passwordStrength,
    validatePasswordStrength,
  };
};

export default usePasswordStrength;
