import {
  DataTable,
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarContent,
} from '@carbon/react';
import { Add, TrashCan, Upload } from '@carbon/react/icons';
import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import PageSubHeader from '@/components/accounts/PageSubHeader';
import TableNavItem from '@/components/alert/TableNavItems';
import ExceptionModalContent from '@/components/profile/ExceptionModalContent';
import ExcludeModalContent from '@/components/profile/ExcludeContent';
import ModalContent from '@/components/profile/ProfileModalContent';
import SubscriptionModalContent from '@/components/profile/SubscriptionContent';
import UploadContent from '@/components/profile/UploadContent';
import Button from '@/components/shared/Button';
import Empty from '@/components/shared/Empty';
import Modal from '@/components/shared/Modal';
import SimpleModalcontent from '@/components/shared/SimpleModalContent/SimpleModalContent';
import Layout from '@/HOC/Layout';
import useHeaders from '@/hooks/useHeaders';
import { FormikRefType } from '@/interfaces/formik.type';
import { protectedRouteProps } from '@/utils/withSession';

const Profile = () => {
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [bulkopen, setBulkOpen] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const formRef = useRef<FormikRefType<any>>(null);
  const router = useRouter();
  const { tab } = router.query;
  const tabNames = ['alert-profile', 'exception', 'exclude', 'subscription'];

  const navItems = useMemo(() => {
    return [{ title: 'Transaction Alert Profile' }, { title: 'Transaction Alert Exception' }, { title: 'Transaction Alert Exclude' }, { title: 'Subscription' }].map(
      (item, index) => ({
        ...item,
        tabName: tabNames[index],
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentTab = navItems.some((item) => item.tabName === tab) ? tab : 'alert-profile';

  const { profileheader, alertexceptionheader, alertexcludeheader } = useHeaders();
  const [filterItems, setFilterItems] = useState<{ key: string; label: string; value: string }[]>([
    {
      key: 'customer_id',
      label: 'Customer ID',
      value: '',
    },
    {
      key: 'account_no',
      label: 'Account Number',
      value: '',
    },
  ]);

  const handleSetIndex = (index: number) => {
    setTabIndex(index);
    router.push({
      pathname: '/profile',
      query: { tab: navItems[index]?.tabName },
    });
  };

  const toggleModal = () => {
    formRef.current?.resetForm();
    setOpen(!open);
  };
  const toggleBulkModal = () => {
    formRef.current?.resetForm();
    setBulkOpen(!bulkopen);
  };

  useEffect(() => {
    const headers = [profileheader, alertexceptionheader, alertexcludeheader, alertexceptionheader].map((item, index) => ({
      data: item,
      tabName: tabNames[index],
    }));

    headers?.forEach((header) => {
      if (header.tabName === currentTab) {
        setHeaders(header.data);
      }
      const data: any[] = [];
      const rows = data.map((item: any) => {
        const row: any = {};
        const tabHeaders = headers.find((header) => header.tabName === currentTab)?.data || [];
        tabHeaders.forEach((item2: { key: string; header: string }) => {
          row[item2.key] = item[item2.key];
        });
        return row;
      });
      !rows.some((row) => row.id === undefined) && setRows(rows);
    });

    if (navItems[tabIndex].title.includes('SMS')) {
      setFilterItems([
        {
          key: 'mobile_no',
          label: 'Mobile No',
          value: '',
        },
      ]);
    } else if (navItems[tabIndex].title.includes('Email')) {
      setFilterItems([
        {
          key: 'email',
          label: 'Email',
          value: '',
        },
      ]);
    } else {
      setFilterItems([
        {
          key: 'customer_id',
          label: 'Customer ID',
          value: '',
        },
        {
          key: 'email',
          label: 'Email',
          value: '',
        },
        {
          key: 'account_no',
          label: 'Account Number',
          value: '',
        },
        {
          key: 'mobile_no',
          label: 'Mobile No',
          value: '',
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertexceptionheader, alertexcludeheader, currentTab, navItems, profileheader, tabIndex]);

  // useEffect(() => {
  //   if (currentTab === 'role') {
  //     // !isEmpty(data?.data) && setResponseData(data?.data as IRole[]);
  //   } else if (currentTab === 'user') {
  //     // !isEmpty(users?.data) && setResponseData(users?.data as UserData[]);
  //   }
  // }, [currentTab]);

  return (
    <Layout
      routename="Profile & Subscriptions"
      navItem={navItems}
      currentTab={currentTab}
      handleSetIndex={handleSetIndex}
      title={'Profile & Subscriptions'}
      subtitle={'Create and manage profile and permissions and subscription'}
    >
      <Modal
        heading={`Create ${tabIndex === 3 ? 'New' : 'Alert'} ${navItems[tabIndex]?.title.split(' ')[navItems[tabIndex]?.title.split(' ').length - 1]}`}
        buttonLabel={`Create ${navItems[tabIndex]?.title.split(' ')[navItems[tabIndex]?.title.split(' ').length - 1]}`}
        open={open}
        toggleModal={toggleModal}
      >
        {tabIndex === 0 ? <ModalContent /> : tabIndex === 1 ? <ExceptionModalContent /> : tabIndex === 2 ? <ExcludeModalContent /> : <SubscriptionModalContent />}
      </Modal>
      <Modal heading={`Bulk Upload`} buttonLabel={`Upload`} open={bulkopen} toggleModal={toggleBulkModal}>
        <SimpleModalcontent content={<UploadContent />} />
      </Modal>
      <PageSubHeader navItem={navItems[tabIndex]?.title} />
      <DataTable rows={Rows} headers={Headers}>
        {({ rows, headers, getHeaderProps, getRowProps, getTableProps, getSelectionProps, getToolbarProps, getBatchActionProps }: any) => (
          <>
            <TableToolbar {...getToolbarProps()}>
              <TableBatchActions {...getBatchActionProps()}>
                <TableBatchAction
                  renderIcon={TrashCan}
                  iconDescription="Delete the selected rows"
                  // onClick={console.log(selectedRows)}
                >
                  Delete
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent>
                {tabIndex != 0 && tabIndex != 2 && <TableNavItem filterItems={filterItems} noDateRange />}
                <Button
                  renderIcon={(props: any) => <Add size={20} {...props} />}
                  buttonLabel={`Create ${navItems[tabIndex]?.title.split(' ')[navItems[tabIndex]?.title.split(' ').length - 1]}`}
                  handleClick={toggleModal}
                />
                {tabIndex !== 0 && (
                  <Button renderIcon={(props: any) => <Upload size={20} {...props} />} handleClick={toggleBulkModal} buttonLabel={`Bulk Upload`} className={'transparent-button'} />
                )}
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header: any, index: number) => (
                    <TableHeader {...getHeaderProps({ header })} key={index}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              {!isEmpty(Rows) && (
                <TableBody>
                  {rows.map((row: any) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map((cell: any) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </>
        )}
      </DataTable>
      {isEmpty(Rows) && <Empty title={'No ' + navItems[tabIndex].title + ' found'} />}
    </Layout>
  );
};

export default Profile;
export const getServerSideProps: GetServerSideProps = protectedRouteProps();
