import PageSubHeader from '@/components/accounts/PageSubHeader';
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
import { isEmpty } from 'lodash';
import SimpleModalcontent from '@/components/shared/SimpleModalContent/SimpleModalContent';
import ModalContent from '@/components/accounts/ModalContent';
import Modal from '@/components/shared/Modal';
import Empty from '@/components/shared/Empty';

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
      <Modal
        buttonTriggerText={''}
        buttonIcon={(props: any) => <TrashCan size={20} {...props} />}
        heading="Confirm delete"
        buttonLabel="Delete"
        secondaryButtonText="Cancel"
        danger={true}
      >
        <SimpleModalcontent content="This user will be sent a temporay password to their email address." />
      </Modal>
      <Modal
        buttonTriggerText={''}
        buttonIcon={(props: any) => <Password size={20} {...props} />}
        heading="Confirm password reset"
        buttonLabel="Reset Password"
        secondaryButtonText="Cancel"
      >
        <SimpleModalcontent content="Are you sure you want to delete this account?." />
      </Modal>

      <Modal
        buttonTriggerText={''}
        buttonIcon={(props: any) => <Edit size={20} {...props} />}
        heading="Edit User"
        buttonLabel="Save changes"
      >
        <ModalContent isEdit />
      </Modal>
    </NavSectionTwo>
  );
};

const Accounts = () => {
  const [indeterminate, setIndeterminate] = React.useState(false);
  const data: any[] = [];

  const headers = [
    {
      key: 'item_key',
      header: (
        <Checkbox id="checked-1" labelText="" indeterminate={indeterminate} />
      ),
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
  const rows = [
    {
      id: 'a',
      item_key: <Checkbox id="checked-2" labelText="" />,
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
      item_key: <Checkbox id="checked-3" labelText="" />,
      first_name: 'Load balancer 1',
      last_name: 'Load Balancer 2',
      email: 'a@gmai.com',
      access_status: <AccessStatus active={false} />,
      role: 'Admin',
      authentication_type: 'Classic',
      others: <ActionIcons />,
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

  .btn-primary {
    background-color: transparent !important;
    color: ${(props) => props.theme.colors.white} !important;
    padding: calc(0.875rem - 3px) 36px calc(0.875rem - 3px) 15px !important;

    &:hover {
      background-color: ${(props) => props.theme.colors.bgHover} !important;
    }
  }
`;
