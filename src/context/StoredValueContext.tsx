import React, { PropsWithChildren, useContext, useState } from 'react';

interface IState {
  opendeleteModal: boolean;
  setOpenDeleteModal: Function;
  openResetPassword: boolean;
  setOpenResetPassword: Function;
  openActivateModal: boolean;
  setOpenActivateModal: Function;
  isSingle: boolean;
  setIsSingle: Function;
  selectedRows: any[];
  setSelectedRows: Function;
}

const initialState: IState = {
  opendeleteModal: false,
  setOpenDeleteModal: () => {},
  openResetPassword: false,
  setOpenResetPassword: () => {},
  openActivateModal: false,
  setOpenActivateModal: () => {},
  isSingle: false,
  setIsSingle: () => {},
  selectedRows: [],
  setSelectedRows: () => {},
};

const StoredValueContext = React.createContext<IState>(initialState);

export function useStore() {
  return useContext(StoredValueContext);
}

export function StoredValuesProvider({ children }: PropsWithChildren) {
  const [opendeleteModal, setOpenDeleteModal] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [openActivateModal, setOpenActivateModal] = useState(false);
  const [isSingle, setIsSingle] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const value = {
    opendeleteModal,
    setOpenDeleteModal,
    openResetPassword,
    setOpenResetPassword,
    openActivateModal,
    setOpenActivateModal,
    isSingle,
    setIsSingle,
    selectedRows,
    setSelectedRows,
  };

  return <StoredValueContext.Provider value={value}>{children}</StoredValueContext.Provider>;
}
