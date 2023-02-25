import PageSubHeader from '@/components/accounts/PageSubHeader';
import Layout from '@/HOC/Layout';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import Empty from '@/components/shared/Empty';
import ActionIcons from '@/components/accounts/ActionIcons';
import { AccessStatus } from '@/components/accounts/AccessStatus';
import IconAndText from '@/components/accounts/IconAndText';
import Modal from '@/components/shared/Modal';
import { useGetRolesQuery, useGetUsersQuery, useLazyGetRolesQuery, useLazyGetUsersQuery } from '@/redux/api';
import useHeaders from '@/hooks/useHeaders';
import { FormikRefType } from '@/interfaces/formik.type';
import Loader from '@/components/shared/Loader';
import useSelectorValue from '@/hooks/useSelector';
import { setTab } from '@/redux/slices/util';
import { useDispatch } from 'react-redux';
import AccountTable from './AccountTable';
import ModalContent from './ModalContent';

const Accounts = () => {
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any[]>([]);
  const { tab } = useSelectorValue();
  const dispatch = useDispatch();
  const formRef = useRef<FormikRefType<any>>(null);
  const [isUpdatedMultiselect, setIsUpdatedMultiselect] = useState(false);
  const { data, isFetching: isLoading } = useGetRolesQuery();
  const { data: users, isFetching: isLoadingUser } = useGetUsersQuery();

  const navItems = useMemo(() => {
    return [{ title: 'User accounts' }, { title: 'Roles & privileges' }];
  }, []);

  const { usersheader, rolesheader } = useHeaders();

  const handleSetIndex = (index: number) => {
    dispatch(setTab(index));
    index !== tab && setResponseData([]);
    if (index === 0) {
      !isEmpty(users?.data) && setResponseData(users?.data);
    } else if (index === 1) {
      !isEmpty(data?.data) && setResponseData(data?.data);
    }
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
    if (tab === 1) {
      !isEmpty(data?.data) && setResponseData(data?.data);
    } else if (tab === 0) {
      !isEmpty(users?.data) && setResponseData(users?.data);
    }
  }, [data?.data, tab, users?.data]);

  useEffect(() => {
    const headers = [usersheader, rolesheader];
    headers?.forEach((header, index) => {
      if (index === tab) {
        setHeaders(header);
      }
      const rows = responseData?.map((item: any) => {
        const row: any = {};
        headers[tab].forEach((item2: { key: string; header: string }) => {
          row[item2.key] = item[item2.key];
          if (tab === 0) {
            row['others'] = <ActionIcons data={item} isUpdatedMultiselect={isUpdatedMultiselect} setIsUpdatedMultiselect={setIsUpdatedMultiselect} />;
            row['status'] = <AccessStatus active={item['status']} />;
            row['roleIds'] = item['roleIds']?.join(', ');
            row.id = item['id'];
          } else {
            row['others'] = <ActionIcons roleData={item} />;
            row['users'] = <IconAndText text={item['users']?.toString()} />;
            row.id = item['roleId'];
          }
        });
        return row;
      });
      !isEmpty(responseData) ? setRows(rows) : setRows([]);
    });
  }, [rolesheader, navItems, tab, usersheader, responseData, isUpdatedMultiselect]);

  return (
    <Layout
      routename="User Management"
      navItem={navItems}
      selected={tab}
      handleSetIndex={handleSetIndex}
      title={'User Management'}
      subtitle={'Create and manage users and permissions'}
    >
      <Modal
        heading={`Create New ${tab === 0 ? 'User' : 'Role'}`}
        buttonLabel={`${tab === 0 ? 'Invite' : 'Create'} ${tab === 0 ? 'User' : 'Role'}`}
        open={open}
        toggleModal={toggleModal}
        onRequestSubmit={handleSubmit}
        extent="sm"
      >
        <ModalContent
          tab={tab}
          formRef={formRef}
          toggleModal={toggleModal}
          isUpdatedMultiselect={isUpdatedMultiselect}
          setIsUpdatedMultiselect={setIsUpdatedMultiselect}
        />
      </Modal>
      <PageSubHeader navItem={navItems[tab]?.title} />
      <AccountTable Rows={Rows} Headers={Headers} tab={tab} toggleModal={toggleModal} isLoading={isLoading || isLoadingUser} />
      {isLoading || isLoadingUser ? (
        <Loader />
      ) : (
        isEmpty(Rows) && <Empty title={'No ' + navItems[tab]?.title + ' found'} text={'You should create' + navItems[tab]?.title + 'first.'} />
      )}
    </Layout>
  );
};

export default Accounts;
