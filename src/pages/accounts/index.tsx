import PageSubHeader from '@/components/PageSubHeader';
import Layout from '@/HOC/Layout';
import React from 'react';
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
import { TrashCan, Password, Edit } from '@carbon/react/icons';
import styled from 'styled-components';
import { px } from '@/utils';

type AccessDotProps = {
  active: boolean;
};

const AccessStatus = ({ active }: AccessDotProps) => {
  return (
    <AccessStatusContainer>
      <AccessDot active={active} />
      <AccessStatusText>{active ? 'Activated' : 'Inactive'}</AccessStatusText>
    </AccessStatusContainer>
  );
};

const ActionIcons = () => {
  return (
    <NavSectionTwo>
      <NavIconItem>
        <TrashCan size={20} />
      </NavIconItem>
      <NavIconItem>
        <Password size={20} />
      </NavIconItem>
      <NavIconItem>
        <Edit size={20} />
      </NavIconItem>
    </NavSectionTwo>
  );
};

const Accounts = () => {
  const rows = [
    {
      id: 'a',
      item_key: <Checkbox id="checked" labelText="" />,
      first_name: 'Load balancer 1',
      last_name: 'Load Balancer 2',
      email: 'a@gmai.com',
      access_status: <AccessStatus active={true} />,
      role: 'Admin',
      authentication_type: 'Classic',
      others: <ActionIcons />,
    },
    {
      id: 'b',
      item_key: <Checkbox id="checked" labelText="" />,
      first_name: 'Load balancer 1',
      last_name: 'Load Balancer 2',
      email: 'a@gmai.com',
      access_status: <AccessStatus active={true} />,
      role: 'Admin',
      authentication_type: 'Classic',
      others: <ActionIcons />,
    },
  ];
  const headers = [
    {
      key: 'item_key',
      header: <Checkbox id="checked" labelText="" />,
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
  return (
    <Layout routename="User Management">
      <PageSubHeader buttonLabel="Create new user" />
      <DataTable rows={rows} headers={headers}>
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
            <TableBody>
              {rows.map((row: any) => (
                <TableRow key={row.id}>
                  {row.cells.map((cell: any) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </Layout>
  );
};

export default Accounts;

const AccessStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(8)};
`;

const AccessDot = styled.div<AccessDotProps>`
  width: ${px(7)};
  height: ${px(7)};
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#24A148' : '#FA4D56')};
`;

const AccessStatusText = styled.p`
  font-size: ${px(14)};
  line-height: ${px(18)};
`;

const NavSectionTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavIconItem = styled.div`
  padding: ${px(16)};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.bgHover};
  }
`;
