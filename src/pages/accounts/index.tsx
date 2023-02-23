import PageSubHeader from '@/components/accounts/PageSubHeader';
import Layout from '@/HOC/Layout';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Checkbox,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableBatchActions,
  TableBatchAction,
} from '@carbon/react';
import { TrashCan, Add, Password } from '@carbon/react/icons';
import { isEmpty } from 'lodash';
import Empty from '@/components/shared/Empty';
import ActionIcons from '@/components/accounts/ActionIcons';
import { AccessStatus } from '@/components/accounts/AccessStatus';
import IconAndText from '@/components/accounts/IconAndText';
import Button from '@/components/shared/Button';
import Modal from '@/components/shared/Modal';
import ModalContent from '@/components/accounts/ModalContent';
import RolesAndProvileges from '@/components/accounts/ModalRolesAndPrivilages';
import { useLazyGetRolesQuery, useLazyGetUsersQuery } from '@/redux/services';
import useHeaders from '@/hooks/useHeaders';
import { FormikRefType } from '@/interfaces/formik.type';
import Loader from '@/components/shared/Loader';

const Accounts = () => {
  const [selected, setSelected] = useState(0);
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any[]>([]);
  const formRef = useRef<FormikRefType<any>>(null);
  const [triggerRoles, { data, isFetching: isLoading }] =
    useLazyGetRolesQuery();
  const [triggerUsers, { data: users, isFetching: isLoadingUser }] =
    useLazyGetUsersQuery();

  const navItems = useMemo(() => {
    return [{ title: 'User accounts' }, { title: 'Roles & privileges' }];
  }, []);

  const { usersheader, rolesheader } = useHeaders();

  const handleSetIndex = (index: number) => {
    setSelected(index);
  };

  const handleSubmit = () => {
    formRef.current?.handleSubmit();
  };
  const toggleModal = () => {
    formRef.current?.resetForm();
    setOpen(!open);
  };

  useEffect(() => {
    const headers = [usersheader, rolesheader];

    headers?.forEach((header, index) => {
      if (index === selected) {
        setHeaders(header);
      }
      const rows = responseData?.map((item: any) => {
        const row: any = {};
        headers[selected].forEach((item2: { key: string; header: string }) => {
          row[item2.key] = item[item2.key];
          if (selected === 0) {
            row['others'] = <ActionIcons data={item} />;
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

      !isEmpty(responseData) && setRows(rows);
    });
  }, [rolesheader, navItems, selected, usersheader, responseData]);

  useEffect(() => {
    if (selected === 1) {
      isEmpty(data?.data) ? setResponseData([]) : setResponseData(data?.data);
    }
    if (selected === 0) {
      isEmpty(users?.data) ? setResponseData([]) : setResponseData(users?.data);
    }
  }, [data?.data, selected, users?.data]);

  useEffect(() => {
    if (selected === 1) {
      triggerRoles({}, true);
    }
    if (selected === 0) {
      triggerUsers({}, true);
    }
  }, [selected, triggerRoles, triggerUsers]);

  return (
    <Layout
      routename="User Management"
      navItem={navItems}
      selected={selected}
      handleSetIndex={handleSetIndex}
      title={'User Management'}
      subtitle={'Create and manage users and permissions'}
    >
      <Modal
        buttonTriggerText={''}
        buttonIcon={(props: any) => <Add size={24} {...props} />}
        heading={`Create New ${navItems[selected]?.title.split(' ').join(' ')}`}
        buttonLabel={`${selected === 0 ? 'Invite' : 'Create'} ${navItems[
          selected
        ]?.title
          .split(' ')
          .join(' ')}`}
        open={open}
        toggleModal={toggleModal}
        onRequestSubmit={handleSubmit}
        extent="sm"
      >
        {selected === 0 ? (
          <ModalContent formRef={formRef} toggleModal={toggleModal} />
        ) : (
          <RolesAndProvileges formRef={formRef} toggleModal={toggleModal} />
        )}
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
                <TableToolbarSearch onChange={() => console.log('123')} />
                <Button
                  renderIcon={(props: any) => <Add size={20} {...props} />}
                  handleClick={toggleModal}
                  buttonLabel={
                    selected === 0 ? 'Create new user' : 'Create new role'
                  }
                />
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
        <Empty
          title={'No ' + navItems[selected].title + ' found'}
          text={'You should create' + navItems[selected].title + 'first.'}
        />
      )}
      {(isLoading || isLoadingUser) && <Loader />}
    </Layout>
  );
};

export default Accounts;
