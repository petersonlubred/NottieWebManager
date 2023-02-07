import { userAccountType, roleType } from '../interfaces/index';
export const users: userAccountType[] = [
  {
    id: 1,
    first_name: 'Load balancer 1',
    last_name: 'Load Balancer 2',
    email: 'a@gmai.com',
    access_status: true,
    role: ['Adminstrator', 'Customer support'],
    authentication_type: 'Classic',
  },
  {
    id: 2,
    first_name: 'Load balancer 1',
    last_name: 'Load Balancer 2',
    email: 'a@gmai.com',
    access_status: false,
    role: ['Adminstrator'],
    authentication_type: 'SSO',
  },
  {
    id: 3,
    first_name: 'Load balancer 1',
    last_name: 'Load Balancer 2',
    email: 'a@gmai.com',
    access_status: true,
    role: ['Adminstrator', 'Customer support', 'Human Resource'],
    authentication_type: 'AD',
  },
];

export const roles: roleType[] = [
  {
    id: 1,
    role_name: 'Admin',
    description: 'This is the roledescription and everything about it',
    number: '9',
  },
  {
    id: 2,
    role_name: 'Admin Lvl 2',
    description: 'This is the roledescription and about it',
    number: '1',
  },
  {
    id: 3,
    role_name: 'Treasurer',
    description: 'This is the and everything about it',
    number: '6',
  },
];
