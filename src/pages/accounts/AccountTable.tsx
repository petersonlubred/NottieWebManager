import React from 'react';
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
  TableToolbarSearch,
  TableBatchActions,
  TableBatchAction,
} from '@carbon/react';
import { TrashCan, Add, Password } from '@carbon/react/icons';
import Button from '@/components/shared/Button';
import { isEmpty } from 'lodash';

type Props = {
  Rows: any[];
  Headers: any[];
  tab: number;
  toggleModal: () => void;
  isLoading: boolean;
};

const AccountTable = ({ Rows, Headers, tab, toggleModal, isLoading }: Props) => {
  return (
    <DataTable rows={Rows} headers={Headers}>
      {({ rows, headers, getHeaderProps, getRowProps, getTableProps, getSelectionProps, getToolbarProps, getBatchActionProps }: any) => (
        <>
          <TableToolbar {...getToolbarProps()}>
            <TableBatchActions {...getBatchActionProps()}>
              <TableBatchAction renderIcon={Password} iconDescription="Download the selected rows">
                Reset Password
              </TableBatchAction>
              <TableBatchAction renderIcon={TrashCan} iconDescription="Delete the selected rows">
                Delete
              </TableBatchAction>
            </TableBatchActions>
            <TableToolbarContent>
              <TableToolbarSearch onChange={() => console.log('123')} />
              <Button
                renderIcon={(props: any) => <Add size={20} {...props} />}
                handleClick={toggleModal}
                buttonLabel={tab === 0 ? 'Create new user' : 'Create new role'}
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
            {!isEmpty(Rows) && !isLoading && (
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
  );
};

export default AccountTable;
