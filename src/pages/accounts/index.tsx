import PageSubHeader from '@/components/accounts/PageSubHeader';
import Layout from '@/HOC/Layout';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import Empty from '@/components/shared/Empty';
import Modal from '@/components/shared/Modal';
import { useGetRolesQuery, useGetUsersQuery } from '@/redux/api';
import useHeaders from '@/hooks/useHeaders';
import { FormikRefType } from '@/interfaces/formik.type';
import Loader from '@/components/shared/Loader';
import AccountTable from '../../components/accounts/views/AccountTable';
import { IHeader, IRole } from '@/interfaces/role';
import { UserData } from '@/interfaces/user';
import { AccessStatus, ActionIcons, IconAndText, ModalContent } from '@/components/accounts';
import { useRouter } from 'next/router';

const Accounts = () => {
  const [Headers, setHeaders] = useState<IHeader[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<UserData[] | IRole[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isSingle, setIsSingle] = useState(false);
  const [opendeleteModal, setOpenDeleteModal] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [openActivateModal, setOpenActivateModal] = useState(false);
  const formRef = useRef<FormikRefType<any>>(null);
  const [isUpdatedMultiselect, setIsUpdatedMultiselect] = useState(false);
  const { data, isFetching: isLoading } = useGetRolesQuery();
  const { data: users, isFetching: isLoadingUser } = useGetUsersQuery();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const router = useRouter();
  const { tab } = router.query;
  const currentTab = ['user', 'role'].includes(tab as string) ? tab : 'user';

  const navItems = useMemo(() => {
    return [
      { title: 'User accounts', tabName: 'user' },
      { title: 'Roles & privileges', tabName: 'role' },
    ];
  }, []);

  const { usersheader, rolesheader } = useHeaders();

  const handleSetIndex = (index: number) => {
    setTabIndex(index);
    router.push({
      pathname: '/accounts',
      query: { tab: navItems[index]?.tabName },
    });
  };

  const handleSubmit = () => {
    formRef.current?.handleSubmit();
  };
  const toggleModal = () => {
    formRef.current?.resetForm();
    setIsUpdatedMultiselect(false);
    if (!isUpdatedMultiselect) {
      setIsUpdatedMultiselect(true);
    }
    setOpen(!open);
  };

  useEffect(() => {
    const headers = [
      { data: usersheader, tabName: 'user' },
      { data: rolesheader, tabName: 'role' },
    ];
    headers?.forEach((header) => {
      if (header.tabName === currentTab) {
        setHeaders(header.data);
      }
      const rows = responseData?.map((item: any) => {
        const row: any = {};
        const tabHeaders = headers.find((header) => header.tabName === currentTab)?.data || [];
        tabHeaders.forEach((item2: IHeader) => {
          row[item2.key] = item[item2.key];
          if (currentTab === 'user') {
            row['others'] = (
              <ActionIcons
                data={item}
                isUpdatedMultiselect={isUpdatedMultiselect}
                setIsUpdatedMultiselect={setIsUpdatedMultiselect}
                selectedRows={selectedRows}
                opendeleteModal={opendeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                openResetPassword={openResetPassword}
                setOpenResetPassword={setOpenResetPassword}
                openActivateModal={openActivateModal}
                setOpenActivateModal={setOpenActivateModal}
                setSelectedRows={setSelectedRows}
                isSingle={isSingle}
                setIsSingle={setIsSingle}
              />
            );
            row['status'] = <AccessStatus active={item['status']} />;
            row['roleIds'] = item['roleIds']?.join(', ');
            row.id = item['id'];
          } else {
            row['others'] = (
              <ActionIcons
                roleData={item}
                selectedRows={selectedRows}
                opendeleteModal={opendeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                setSelectedRows={setSelectedRows}
                isSingle={isSingle}
                setIsSingle={setIsSingle}
              />
            );
            row['users'] = <IconAndText text={item['users']?.toString()} />;
            row.id = item['roleId'];
          }
        });
        return row;
      });
      !rows.some((row) => row.id === undefined) && setRows(rows);
    });
  }, [rolesheader, navItems, usersheader, responseData, isUpdatedMultiselect, selectedRows, opendeleteModal, openResetPassword, openActivateModal, isSingle, tabIndex, currentTab]);

  useEffect(() => {
    if (currentTab === 'role') {
      !isEmpty(data?.data) && setResponseData(data?.data as IRole[]);
    } else if (currentTab === 'user') {
      !isEmpty(users?.data) && setResponseData(users?.data as UserData[]);
    }
  }, [data?.data, users?.data, currentTab]);

  return (
    <Layout
      routename="User Management"
      handleSetIndex={handleSetIndex}
      navItem={navItems}
      currentTab={currentTab}
      title={'User Management'}
      subtitle={'Create and manage users and permissions'}
    >
      <Modal
        heading={`Create New ${tabIndex === 0 ? 'User' : 'Role'}`}
        buttonLabel={`${tabIndex === 0 ? 'Invite' : 'Create'} ${tabIndex === 0 ? 'User' : 'Role'}`}
        open={open}
        toggleModal={toggleModal}
        onRequestSubmit={handleSubmit}
        extent="sm"
      >
        <ModalContent tab={tabIndex} formRef={formRef} toggleModal={toggleModal} isUpdatedMultiselect={isUpdatedMultiselect} setIsUpdatedMultiselect={setIsUpdatedMultiselect} />
      </Modal>
      <PageSubHeader navItem={navItems[tabIndex]?.title} />
      <AccountTable
        Rows={Rows}
        Headers={Headers}
        tab={tabIndex}
        toggleModal={toggleModal}
        isLoading={isLoading || isLoadingUser}
        setSelectedRows={setSelectedRows}
        setOpenDeleteModal={setOpenDeleteModal}
        setOpenResetPassword={setOpenResetPassword}
        setOpenActivateModal={setOpenActivateModal}
        openDeleteModal={opendeleteModal}
        openResetPassword={openResetPassword}
        openActivateModal={openActivateModal}
      />
      {isLoading || isLoadingUser ? (
        <Loader />
      ) : (
        isEmpty(Rows) && <Empty title={'No ' + navItems[tabIndex]?.title + ' found'} text={'You should create' + navItems[tabIndex]?.title + 'first.'} />
      )}
    </Layout>
  );
};

export default Accounts;
