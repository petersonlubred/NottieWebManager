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
import React, { useEffect, useMemo, useState } from 'react';

import PageSubHeader from '@/components/accounts/PageSubHeader';
import TableNabItem from '@/components/alert/TableNavItems';
import Empty from '@/components/shared/Empty';
import Layout from '@/HOC/Layout';
import useHeaders from '@/hooks/useHeaders';
import { protectedRouteProps } from '@/utils/withSession';

const Alert = () => {
  const [selected, setSelected] = useState(0);
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
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

  const {
    inflowheader,
    smsheader,
    emailheader,
    nontransactionheader,

    otpheader,
  } = useHeaders();

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
    ];
  }, []);

  const handleSetIndex = (index: number) => {
    setSelected(index);
  };

  useEffect(() => {
    const headers = [inflowheader, smsheader, emailheader, nontransactionheader, smsheader, emailheader, otpheader, smsheader, emailheader];
    headers?.forEach((header, index) => {
      if (index === selected) {
        setHeaders(header);
      }
      const data: any[] = [];
      const rows = data.map((item: any) => {
        const row: any = {};
        headers[selected].forEach((item2: { key: string; header: string }) => {
          row[item2.key] = item[item2.key];
        });
        return row;
      });
      setRows(rows);
    });

    if (navItems[selected].title.includes('SMS')) {
      setFilterItems([
        {
          key: 'mobile_no',
          label: 'Mobile No',
          value: '',
        },
      ]);
    } else if (navItems[selected].title.includes('Email')) {
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
  }, [emailheader, inflowheader, navItems, nontransactionheader, otpheader, selected, smsheader]);

  return (
    <Layout
      routename="Alerts and Notification"
      navItem={navItems}
      selected={selected}
      handleSetIndex={handleSetIndex}
      title={'Alerts and Notification'}
      subtitle={'View all types of notification and alert activities'}
    >
      <PageSubHeader navItem={navItems[selected]?.title} />
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
      {isEmpty(Rows) && <Empty title={'No ' + navItems[selected].title + ' alerts found'} />}
    </Layout>
  );
};

export default Alert;
export const getServerSideProps: GetServerSideProps = protectedRouteProps();
