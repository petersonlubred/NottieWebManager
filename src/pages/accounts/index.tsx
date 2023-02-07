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
} from '@carbon/react';
import { isEmpty } from 'lodash';
import Empty from '@/components/shared/Empty';
import { roles, users } from '@/mockData/index';
import ActionIcons from '@/components/accounts/ActionIcons';
import { AccessStatus } from '@/components/accounts/AccessStatus';

const Accounts = () => {
  const data: any[] = [];
  const [selected, setSelected] = useState(0);
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);

  const usersheader = useMemo(() => {
    return [
      {
        key: 'item_key',
        header: <Checkbox id="checked-1" labelText="" />,
      },
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
        key: 'item_key',
        header: <Checkbox id="checked-1" labelText="" />,
      },
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
        header: 'Number',
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
        id: role.id,
        item_key: <Checkbox id="checked-2" labelText="" />,
        role_name: role.role_name,
        description: role.description,
        number: role.number,
        others: <ActionIcons />,
      };
    });
  }, []);

  const userData = useMemo(() => {
    return users.map((user, _) => {
      return {
        id: user.id,
        item_key: <Checkbox id="checked-2" labelText="" />,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        access_status: <AccessStatus active={user.access_status} />,
        role: user.role,
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

  return (
    <Layout
      routename="User Management"
      navItem={['User accounts', 'Roles & privileges']}
      selected={selected}
      handleSetIndex={handleSetIndex}
    >
      <PageSubHeader buttonLabel="Create new user" />
      <DataTable rows={Rows} headers={Headers}>
        {({ rows, headers, getHeaderProps, getTableProps }: any) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header: any, index: number) => (
                  <TableHeader {...getHeaderProps({ header })} key={index}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            {isEmpty(data) && (
              <TableBody>
                {rows.map((row: any) => (
                  <TableRow key={row.id}>
                    {row.cells.map((cell: any) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        )}
      </DataTable>
      {!isEmpty(data) && (
        <Empty title="No users yet" text="You should create roles first." />
      )}
    </Layout>
  );
};

export default Accounts;
