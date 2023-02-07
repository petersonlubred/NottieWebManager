import PageSubHeader from '@/components/accounts/PageSubHeader';
import Layout from '@/HOC/Layout';
import React, { useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import { isEmpty } from 'lodash';
import Empty from '@/components/shared/Empty';
import { headers, rows } from '@/utils/dtos';

const Accounts = () => {
  const data: any[] = [];
  const [selected, setSelected] = useState(0);
  const handleSetIndex = (index: number) => {
    setSelected(index);
  };

  return (
    <Layout
      routename="User Management"
      navItem={['User accounts', 'Roles & privileges']}
      selected={selected}
      handleSetIndex={handleSetIndex}
    >
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
