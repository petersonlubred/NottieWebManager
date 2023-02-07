import { AccessStatus } from '@/components/accounts/AccessStatus';
import ActionIcons from '@/components/accounts/ActionIcons';
import { Checkbox } from '@carbon/react';

export const rolesheader = [
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

export const rolesRows = [
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

export const headers = [
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

export const rows = [
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
