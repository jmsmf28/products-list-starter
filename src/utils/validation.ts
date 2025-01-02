export const validateName = (name: string): boolean => {
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 5;
};

  export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  export const validateAddress = (address: string): boolean => {
    return address.trim().length >= 5; 
  };

