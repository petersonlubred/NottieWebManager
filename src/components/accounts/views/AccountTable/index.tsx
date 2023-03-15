import { Add, Password, TrashCan } from '@carbon/icons-react';
import {
  DataTable,
  DataTableCustomRenderProps,
  DataTableHeader,
  DataTableSkeleton,
  DataTableSkeletonHeader,
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from 'carbon-components-react';
import { isEmpty } from 'lodash';
import React, { ChangeEvent, useState } from 'react';

import Button from '@/components/shared/Button';
import useNetworkRequest from '@/hooks/useNetworkRequest';
import { IPageQuery } from '@/interfaces/notification';
import { BulkResetPassword } from '@/interfaces/user';

import ActionModal from '../../ActionModals';

type Props = {
  Rows: any[];
  Headers: DataTableHeader[] & DataTableSkeletonHeader[];
  tab: number;
  toggleModal: () => void;
  isLoading: boolean;
  setQuery: React.Dispatch<React.SetStateAction<IPageQuery>>;
  query: IPageQuery;
};

const AccountTable = ({ Rows, Headers, tab, toggleModal, isLoading, query, setQuery }: Props) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [action, setAction] = useState<string>('');
  const [context, setContext] = useState<any>('');

  const toggleActionModal = () => {
    setAction('');
  };

  const { handleRequest, loading } = useNetworkRequest(toggleActionModal);
  return (
    <>
      <DataTable
        rows={Rows}
        headers={Headers}
        render={({ rows, headers, getTableProps, getSelectionProps, getToolbarProps, getBatchActionProps, selectedRows }: DataTableCustomRenderProps) => (
          <>
            <TableToolbar {...getToolbarProps()}>
              <TableBatchActions {...getBatchActionProps()}>
                {tab === 0 && (
                  <>
                    <TableBatchAction
                      renderIcon={Password}
                      iconDescription="Reset password for the selected rows"
                      onClick={() => {
                        const result: BulkResetPassword = [];
                        selectedRows.forEach((obj: { id: string; value?: string; cells: any }) => {
                          const emailCell = obj?.cells.find((cell: any) => cell.id.endsWith(':emailAddress'));
                          if (emailCell) {
                            result.push({
                              userId: obj.id,
                              emailAddress: emailCell.value,
                            });
                          }
                        });
                        setSelectedRows(result);
                        setAction('reset');
                        setContext('user');
                      }}
                    >
                      Reset Password
                    </TableBatchAction>
                    <TableBatchAction
                      renderIcon={TrashCan}
                      iconDescription="Activate the selected rows"
                      onClick={() => {
                        setAction('activate');
                        setContext('user');
                        setSelectedRows(selectedRows?.map((row) => row.id));
                      }}
                    >
                      Activate
                    </TableBatchAction>
                  </>
                )}
                <TableBatchAction
                  renderIcon={TrashCan}
                  iconDescription="Delete the selected rows"
                  onClick={() => {
                    setAction('delete');
                    setContext(tab === 0 ? 'user' : 'role');
                    setSelectedRows(selectedRows?.map((row) => row.id));
                  }}
                >
                  Delete
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent>
                <TableToolbarSearch
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setQuery({
                      ...query,
                      search: e.target.value,
                    });
                  }}
                />
                <Button renderIcon={(props: any) => <Add size={20} {...props} />} handleClick={toggleModal} buttonLabel={tab === 0 ? 'Create new user' : 'Create new role'} />
              </TableToolbarContent>
            </TableToolbar>

            <TableContainer>
              {isLoading ? (
                <DataTableSkeleton showHeader={false} showToolbar={false} compact rowCount={7} columnCount={Headers?.length - 1} headers={Headers} />
              ) : (
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {tab === 0 && <TableSelectAll {...getSelectionProps()} />}
                      {headers.map((header: DataTableHeader, index: number) => (
                        <TableHeader key={index}>{header.header}</TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  {!isEmpty(Rows) && !isLoading && (
                    <TableBody>
                      {rows.map((row: any) => (
                        <TableRow key={row.id}>
                          {tab === 0 && <TableSelectRow {...getSelectionProps({ row })} />}
                          {row.cells.map((cell: any) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              )}
            </TableContainer>
          </>
        )}
      />
      <ActionModal
        action={action}
        isLoading={loading}
        context={context}
        setAction={setAction}
        toggleModal={toggleActionModal}
        handleAction={() =>
          action === 'delete' && context === 'user'
            ? handleRequest({ status: false, ids: selectedRows }, 'delete-users')
            : action === 'delete' && context === 'role'
            ? handleRequest({ ids: selectedRows }, 'delete-roles')
            : action === 'activate'
            ? handleRequest({ status: true, ids: selectedRows }, 'activate-users')
            : handleRequest({ reqBody: selectedRows }, 'reset-passwords')
        }
      />
    </>
  );
};

export default AccountTable;
