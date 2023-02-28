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
import { TrashCan } from '@carbon/react/icons';
import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import PageSubHeader from '@/components/accounts/PageSubHeader';
import TableNabItem from '@/components/alert/TableNavItems';
import Empty from '@/components/shared/Empty';
import Layout from '@/HOC/Layout';
import useHeaders from '@/hooks/useHeaders';
import { protectedRouteProps } from '@/utils/withSession';

const Alert = () => {
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const router = useRouter();
  const { tab } = router.query;
  const tabNames = ['txn-inflow', 'txn-sms', 'txn-email', 'non-txn', 'non-txn-sms', 'non-txn-email', 'otp', 'otp-sms', 'otp-email'];

  const navItems = useMemo(() => {
    return [
      { title: 'Transaction Inflow' },
      { title: 'Transaction SMS' },
      { title: 'Transaction Email' },
      { title: 'Non-Transaction' },
      { title: 'Non-Transaction SMS' },
      { title: 'Non-Transaction Email' },
      { title: 'OTP' },
      { title: 'OTP-SMS' },
      { title: 'OTP-Email' },
    ].map((item, index) => ({
      ...item,
      tabName: tabNames[index],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentTab = navItems.some((item) => item.tabName === tab) ? tab : 'txn-inflow';
  const { inflowheader, smsheader, emailheader, nontransactionheader, otpheader } = useHeaders();

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
      pathname: '/alert',
      query: { tab: navItems[index]?.tabName },
    });
  };

  useEffect(() => {
    const headers = [inflowheader, smsheader, emailheader, nontransactionheader, smsheader, emailheader, otpheader, smsheader, emailheader].map((item, index) => ({
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
          key: 'account_no',
          label: 'Account Number',
          value: '',
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailheader, inflowheader, navItems, nontransactionheader, otpheader, tabIndex, smsheader, currentTab]);

  return (
    <Layout
      routename="Alerts and Notification"
      navItem={navItems}
      currentTab={currentTab}
      handleSetIndex={handleSetIndex}
      title={'Alerts and Notification'}
      subtitle={'View all types of notification and alert activities'}
    >
      <PageSubHeader navItem={navItems[tabIndex]?.title} />
      <DataTable rows={Rows} headers={Headers}>
        {({ rows, headers, getHeaderProps, getRowProps, getTableProps, getSelectionProps, getToolbarProps, getBatchActionProps }: any) => (
          <>
            <TableToolbar {...getToolbarProps()}>
              <TableBatchActions {...getBatchActionProps()}>
                <TableBatchAction renderIcon={TrashCan} iconDescription="Delete the selected rows" onClick={() => null}>
                  Delete
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent>
                <TableNabItem filterItems={filterItems} />
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
      {isEmpty(Rows) && <Empty title={'No ' + navItems[tabIndex].title + ' alerts found'} />}
    </Layout>
  );
};

export default Alert;
export const getServerSideProps: GetServerSideProps = protectedRouteProps();
