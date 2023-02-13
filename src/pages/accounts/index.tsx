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
import { roles, users } from '@/mockData/index';
import ActionIcons from '@/components/accounts/ActionIcons';
import { AccessStatus } from '@/components/accounts/AccessStatus';
import IconAndText from '@/components/accounts/IconAndText';
import Button from '@/components/shared/Button';
import Modal from '@/components/shared/Modal';
import ModalContent from '@/components/accounts/ModalContent';
import ModalisEditsAndPrivilages from '@/components/accounts/ModalRolesAndPrivilages';

const Accounts = () => {
  const [selected, setSelected] = useState(0);
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openRole, setOpenRole] = useState<boolean>(false);

  const navItems = [
    { title: 'User accounts' },
    { title: 'Roles & privileges' },
  ];

  const usersheader = useMemo(() => {
    return [
      {
        key: 'first_name',
        header: 'First Name',
      },
      {
        key: 'last_name',
        header: 'lastName',
      },
      {
        key: 'email',
        header: 'Email Address',
      },
      {
        key: 'access_status',
        header: 'Access Status',
      },
      {
        key: 'role',
        header: 'Role',
      },
      {
        key: 'authentication_type',
        header: 'Authentication Type',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const rolesheader = useMemo(() => {
    return [
      {
        key: 'role_name',
        header: 'Role Name',
      },
      {
        key: 'description',
        header: 'Description',
      },
      {
        key: 'number',
        header: 'Number of Users',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const roleData = useMemo(() => {
    return roles.map((role, _) => {
      return {
        id: role.id.toString(),
        item_key: <Checkbox id={`checked-role-${role.id}`} labelText="" />,
        role_name: role.role_name,
        description: role.description,
        number: <IconAndText text={role?.number.toString()} />,
        others: <ActionIcons />,
      };
    });
  }, []);

  const userData = useMemo(() => {
    return users.map((user, _) => {
      return {
        id: user.id.toString(),
        item_key: <Checkbox id={`checked-user-${user.id}`} labelText="" />,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        access_status: <AccessStatus active={user.access_status} />,
        role: user.role.join(', '),
        authentication_type: user.authentication_type,
        others: <ActionIcons />,
      };
    });
  }, []);

  const handleSetIndex = (index: number) => {
    setSelected(index);
  };

  useEffect(() => {
    if (selected === 1) {
      setHeaders(rolesheader);
      setRows(roleData);
    } else {
      setHeaders(usersheader);
      setRows(userData);
    }
  }, [roleData, rolesheader, selected, userData, usersheader]);

  const toggleModal = () => {
    selected === 0 ? setOpen(!open) : setOpenRole(!openRole);
  };

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
        heading="Create New User"
        buttonLabel="Invite user"
        open={open}
        toggleModal={toggleModal}
      >
        <ModalContent />
      </Modal>
      <ModalisEditsAndPrivilages
        open={openRole}
        isEdit={false}
        toggleModal={toggleModal}
      />
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
                  onClick={console.log(selectedRows)}
                >
                  Reset Password
                </TableBatchAction>
                <TableBatchAction
                  renderIcon={TrashCan}
                  iconDescription="Delete the selected rows"
                  onClick={console.log(selectedRows)}
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
        <Empty title="No users yet" text="You should create roles first." />
      )}
    </Layout>
  );
};

export default Accounts;
