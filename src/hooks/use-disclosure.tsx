import { useState } from 'react';
export const useDisclosure = (initialValue = false) => {
  const [open, setOpen] = useState(initialValue);
  const toggle = () => {
    setOpen((open) => !open);
  };
  return { open, setOpen, toggle };
};
