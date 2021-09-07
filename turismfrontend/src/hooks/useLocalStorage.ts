import { useState } from 'react';

const useLocalStorage = (key: string) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  });

  const setValue = (value: string) => {
    setState(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [state, setValue];
};

export default useLocalStorage;
