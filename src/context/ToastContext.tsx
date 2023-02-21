import React, { PropsWithChildren, useContext, useState } from 'react';

interface IState {
  toast: Function;
  kind: string;
  title: string;
  rerender: boolean;
}

const initialState: IState = {
  toast: () => {},
  kind: '',
  title: '',
  rerender: false,
};

const ToastContext = React.createContext<IState>(initialState);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: PropsWithChildren) {
  const [kind, setKind] = React.useState<string>('info-square');
  const [title, setTitle] = React.useState<string>('');
  const [rerender, setRerender] = React.useState<boolean>(false);

  const toast = (kind: string, title: string) => {
    setKind(kind);
    setTitle(title);
    setRerender(!rerender);
  };

  const value = { toast, kind, title, rerender };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
