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
  TableHeaderProps,
  TableBatchActionProps,
  TableToolbarProps,
  TableRowProps,
  TableSelectRowProps,
  TableProps,
  DataTableSkeleton,
} from '@carbon/react';
import { TrashCan, Add, Password } from '@carbon/react/icons';
import Button from '@/components/shared/Button';
import { isEmpty } from 'lodash';
import { IHeader } from '@/interfaces/role';

type Props = {
  Rows: any[];
  Headers: IHeader[];
  tab: number;
  toggleModal: () => void;
  isLoading: boolean;
  setSelectedRows: Function;
  setOpenDeleteModal: Function;
  setOpenActivateModal: Function;
  setOpenResetPassword?: Function;
  openDeleteModal: boolean;
  openActivateModal: boolean;
  openResetPassword: boolean;
};

const AccountTable = ({
  Rows,
  Headers,
  tab,
  toggleModal,
  isLoading,
  setSelectedRows,
  setOpenDeleteModal,
  setOpenResetPassword,
  setOpenActivateModal,
  openDeleteModal,
  openActivateModal,
  openResetPassword,
}: Props) => {
  return isLoading ? (
    <DataTableSkeleton showHeader={false} showToolbar={false} size="compact" rowCount={7} columnCount={Headers?.length - 1} headers={Headers} />
  ) : (
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
      }: {
        rows: any[];
        headers: IHeader[];
        getHeaderProps: (_props: IHeader) => TableHeaderProps;
        getRowProps: (_props: any) => TableRowProps;
        getTableProps: () => TableProps;
        getSelectionProps: (_props?: { row: string }) => TableSelectRowProps;
        getToolbarProps: () => TableToolbarProps;
        getBatchActionProps: () => TableBatchActionProps;
        selectedRows: { id: string }[];
      }) => (
        <>
          <TableToolbar {...getToolbarProps()}>
            <TableBatchActions {...getBatchActionProps()}>
              {tab === 0 && (
                <>
                  <TableBatchAction
                    renderIcon={Password}
                    iconDescription="Download the selected rows"
                    onClick={() => {
                      setOpenResetPassword && setOpenResetPassword(!openResetPassword);
                      setSelectedRows(selectedRows?.map((row) => row.id));
                    }}
                  >
                    Reset Password
                  </TableBatchAction>
                  <TableBatchAction
                    renderIcon={TrashCan}
                    iconDescription="Activate the selected rows"
                    onClick={() => {
                      setOpenActivateModal && setOpenActivateModal(!openActivateModal);
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
                  setOpenDeleteModal && setOpenDeleteModal(!openDeleteModal);
                  setSelectedRows(selectedRows?.map((row) => row.id));
                }}
              >
                Delete
              </TableBatchAction>
            </TableBatchActions>
            <TableToolbarContent>
              <TableToolbarSearch onChange={() => {}} />
              <Button renderIcon={(props: any) => <Add size={20} {...props} />} handleClick={toggleModal} buttonLabel={tab === 0 ? 'Create new user' : 'Create new role'} />
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableSelectAll {...getSelectionProps()} />
                {headers.map((header: IHeader, index: number) => (
                  <TableHeader {...getHeaderProps({ ...header })} key={index}>
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
