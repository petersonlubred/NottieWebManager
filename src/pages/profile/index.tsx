import PageSubHeader from '@/components/accounts/PageSubHeader';
import Layout from '@/HOC/Layout';
import React, { useEffect, useMemo, useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarContent,
  TableBatchActions,
  TableBatchAction,
} from '@carbon/react';
import { TrashCan, Add, Password, Upload } from '@carbon/react/icons';
import { isEmpty } from 'lodash';
import Empty from '@/components/shared/Empty';
import Button from '@/components/shared/Button';
import useHeaders from '@/hooks/useHeaders';
import TableNavItem from '@/components/alert/TableNavItems';
import Modal from '@/components/shared/Modal';
import ModalContent from '@/components/profile/ProfileModalContent';
import ExceptionModalContent from '@/components/profile/ExceptionModalContent';
import ExcludeModalContent from '@/components/profile/ExcludeContent';
import SubscriptionModalContent from '@/components/profile/SubscriptionContent';
import SimpleModalcontent from '@/components/shared/SimpleModalContent/SimpleModalContent';

const Accounts = () => {
  const [selected, setSelected] = useState(0);
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [bulkopen, setBulkOpen] = useState<boolean>(false);
  const { profileheader, alertexceptionheader, alertexcludeheader } =
    useHeaders();
  const [filterItems, setFilterItems] = useState<
    { key: string; label: string; value: string }[]
  >([
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

  const navItems = useMemo(() => {
    return [
      { title: 'Transaction Alert Profile' },
      { title: 'Transaction Alert Exception' },
      { title: 'Transaction Alert Exclude' },
      { title: 'Subscription' },
    ];
  }, []);

  const handleSetIndex = (index: number) => {
    setSelected(index);
  };
  useEffect(() => {
    const headers = [
      profileheader,
      alertexceptionheader,
      alertexcludeheader,
      alertexceptionheader,
    ];
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
  }, [
    alertexceptionheader,
    alertexcludeheader,
    navItems,
    profileheader,
    selected,
  ]);

  const toggleModal = () => {
    setOpen(!open);
  };
  const toggleBulkModal = () => {
    setBulkOpen(!bulkopen);
  };

  return (
    <Layout
      routename="Profile & Subscriptions"
      navItem={navItems}
      selected={selected}
      handleSetIndex={handleSetIndex}
      title={'Profile & Subscriptions'}
      subtitle={'Create and manage profile and permissions and subscription'}
    >
      <Modal
        buttonTriggerText={''}
        buttonIcon={(props: any) => <Add size={24} {...props} />}
        heading={`Create ${selected === 3 ? 'New' : 'Alert'} ${
          navItems[selected]?.title.split(' ')[
            navItems[selected]?.title.split(' ').length - 1
          ]
        }`}
        buttonLabel={`Create ${
          navItems[selected]?.title.split(' ')[
            navItems[selected]?.title.split(' ').length - 1
          ]
        }`}
        open={open}
        toggleModal={toggleModal}
      >
        {selected === 0 ? (
          <ModalContent />
        ) : selected === 1 ? (
          <ExceptionModalContent />
        ) : selected === 2 ? (
          <ExcludeModalContent />
        ) : (
          <SubscriptionModalContent />
        )}
      </Modal>
      <Modal
        buttonTriggerText={''}
        buttonIcon={(props: any) => <Add size={24} {...props} />}
        heading={`Bulk Upload`}
        buttonLabel={`Upload`}
        open={bulkopen}
        toggleModal={toggleBulkModal}
      >
        <SimpleModalcontent content={''} />
      </Modal>
      <PageSubHeader navItem={navItems[selected]?.title} />
      <DataTable rows={Rows} headers={Headers}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
          getSelectionProps,
          getToolbarProps,
          getBatchActionProps,
          selectedRows,
        }: any) => (
          <>
            <TableToolbar {...getToolbarProps()}>
              <TableBatchActions {...getBatchActionProps()}>
                <TableBatchAction
                  renderIcon={Password}
                  iconDescription="Download the selected rows"
                  // onClick={console.log(selectedRows)}
                >
                  Reset Password
                </TableBatchAction>
                <TableBatchAction
                  renderIcon={TrashCan}
                  iconDescription="Delete the selected rows"
                  // onClick={console.log(selectedRows)}
                >
                  Delete
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent>
                {selected != 0 && selected != 2 && (
                  <TableNavItem filterItems={filterItems} noDateRange />
                )}
                <Button
                  renderIcon={(props: any) => <Add size={20} {...props} />}
                  buttonLabel={`Create ${
                    navItems[selected]?.title.split(' ')[
                      navItems[selected]?.title.split(' ').length - 1
                    ]
                  }`}
                  handleClick={toggleModal}
                />
                {selected !== 0 && (
                  <Button
                    renderIcon={(props: any) => <Upload size={20} {...props} />}
                    handleClick={toggleBulkModal}
                    buttonLabel={`Bulk Upload`}
                    className={'transparent-button'}
                  />
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
      {isEmpty(Rows) && (
        <Empty title={'No ' + navItems[selected].title + ' found'} />
      )}
    </Layout>
  );
};

export default Accounts;
