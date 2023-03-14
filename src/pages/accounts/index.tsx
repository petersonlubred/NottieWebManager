import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { AccessStatus, ActionIcons, IconAndText, ModalContent } from '@/components/accounts';
import PageSubHeader from '@/components/accounts/PageSubHeader';
import Empty from '@/components/shared/Empty';
import Loader from '@/components/shared/Loader';
import Modal from '@/components/shared/Modal';
import Layout from '@/HOC/Layout';
import { useDebounce } from '@/hooks/useDebounce';
import useHeaders from '@/hooks/useHeaders';
import { FormikRefType } from '@/interfaces/formik.type';
import { initialPageQuery, IPageQuery } from '@/interfaces/notification';
import { IHeader, IRole } from '@/interfaces/role';
import { UserData } from '@/interfaces/user';
import { useGetRolesQuery, useGetUsersQuery } from '@/redux/api';
import { pickValues } from '@/utils/helpers/helpers';
import { protectedRouteProps } from '@/utils/withSession';

import AccountTable from '../../components/accounts/views/AccountTable';

const Accounts = () => {
  const [Headers, setHeaders] = useState<IHeader[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<UserData[] | IRole[]>([]);
  const formRef = useRef<FormikRefType<any>>(null);
  const [isUpdatedMultiselect, setIsUpdatedMultiselect] = useState(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [query, setQuery] = useState<IPageQuery>(initialPageQuery);
  const debounceFilter = useDebounce(query, 500);

  const router = useRouter();
  const { tab } = router.query;
  const currentTab = ['user', 'role'].includes(tab as string) ? tab : 'user';
  const { data: users, isFetching: isLoadingUser } = useGetUsersQuery(
    { ...pickValues(debounceFilter) },
    {
      skip: currentTab !== 'user',
    }
  );
  const { data, isFetching: isLoading } = useGetRolesQuery(
    { ...pickValues(debounceFilter) },
    {
      skip: currentTab !== 'role',
    }
  );

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
    setQuery(initialPageQuery);
  }, [currentTab]);

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
            row['others'] = <ActionIcons data={item} isUpdatedMultiselect={isUpdatedMultiselect} setIsUpdatedMultiselect={setIsUpdatedMultiselect} />;
            row['status'] = <AccessStatus active={item['status']} />;
            row['roles'] = item['roles']?.join(', ');
            row.id = item['id'];
          } else {
            row['others'] = <ActionIcons roleData={item} />;
            row['users'] = <IconAndText text={item['users']?.toString()} />;
            row.id = item['roleId'];
          }
        });
        return row;
      });
      !rows.some((row) => row.id === undefined) && setRows(rows);
    });
  }, [rolesheader, usersheader, responseData, isUpdatedMultiselect, tabIndex, currentTab]);

  useEffect(() => {
    if (currentTab === 'role') {
      !isEmpty(data?.data) ? setResponseData(data?.data as IRole[]) : setResponseData([]);
    } else if (currentTab === 'user') {
      !isEmpty(users?.data) ? setResponseData(users?.data as UserData[]) : setResponseData([]);
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
      <AccountTable Rows={Rows} Headers={Headers} tab={tabIndex} toggleModal={toggleModal} isLoading={isLoading || isLoadingUser} query={query} setQuery={setQuery} />
      {isLoading || isLoadingUser ? (
        <Loader />
      ) : (
        isEmpty(Rows) && <Empty title={'No ' + navItems[tabIndex]?.title + ' found'} text={'You should create' + navItems[tabIndex]?.title + 'first.'} />
      )}
    </Layout>
  );
};

export default Accounts;
export const getServerSideProps: GetServerSideProps = protectedRouteProps();
