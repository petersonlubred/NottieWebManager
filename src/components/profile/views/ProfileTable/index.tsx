import {
  DataTable,
  DataTableSkeleton,
  Table,
  TableBatchAction,
  TableBatchActionProps,
  TableBatchActions,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderProps,
  TableProps,
  TableRow,
  TableRowProps,
  TableSelectAll,
  TableSelectRow,
  TableSelectRowProps,
  TableToolbar,
  TableToolbarContent,
  TableToolbarProps,
} from '@carbon/react';
import { Add, Upload, TrashCan } from '@carbon/react/icons';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

import Button from '@/components/shared/Button';
import useNetworkRequest from '@/hooks/useNetworkRequest';
import { IHeader } from '@/interfaces/role';

import ActionModal from '../../ActionModals';
import TableNavItem from '@/components/alert/TableNavItems';

type Props = {
  Rows: any[];
  Headers: IHeader[];
  toggleModal: () => void;
  isLoading: boolean;
  currentTab: string | string[] | undefined;
  tabIndex: number;
  filterItems: any[];
  navItems: any[];
  setFilterData: React.Dispatch<
    React.SetStateAction<{
      [key: string]: unknown;
    }>
  >;
  filterData: { [key: string]: any[] };
  toggleBulkModal: () => void;
};

const ProfileTable = ({ Rows, Headers, toggleModal, isLoading, currentTab, tabIndex, filterItems, toggleBulkModal, navItems, setFilterData, filterData }: Props) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [action, setAction] = useState<string>('');

  const toggleActionModal = () => {
    setAction('');
  };

  const { handleRequest, loading } = useNetworkRequest(toggleActionModal);

  return isLoading ? (
    <DataTableSkeleton showHeader={false} showToolbar={false} size="compact" rowCount={7} columnCount={Headers?.length - 1} headers={Headers} />
  ) : (
    <>
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
                <TableBatchAction
                  renderIcon={TrashCan}
                  iconDescription="Delete the selected rows"
                  onClick={() => {
                    setAction('delete');
                    setSelectedRows(selectedRows?.map((row) => row.id));
                  }}
                >
                  Delete
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent>
                {tabIndex != 0 && tabIndex != 2 && <TableNavItem filterItems={filterItems} setFilterData={setFilterData} filterData={filterData} noDateRange />}
                <Button
                  renderIcon={(props: any) => <Add size={20} {...props} />}
                  buttonLabel={`Create ${navItems[tabIndex]?.title.split(' ')[navItems[tabIndex]?.title.split(' ').length - 1]}`}
                  handleClick={toggleModal}
                />
                {tabIndex !== 0 && (
                  <Button renderIcon={(props: any) => <Upload size={20} {...props} />} handleClick={toggleBulkModal} buttonLabel={`Bulk Upload`} className={'transparent-button'} />
                )}
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header: any, index: number) => (
                    <TableHeader
                      {...getHeaderProps({
                        header,
                        key: '',
                      })}
                      key={index}
                    >
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
      <ActionModal
        action={action}
        isLoading={loading}
        context={currentTab as string}
        setAction={setAction}
        toggleModal={toggleActionModal}
        handleAction={() => {
          action === 'delete' && currentTab === 'alert-profile' && handleRequest({ ids: selectedRows }, 'delete-alert-profiles');
          action === 'delete' && currentTab === 'exception' && handleRequest({ ids: selectedRows }, 'delete-exceptions');
          action === 'delete' && currentTab === 'exclude' && handleRequest({ ids: selectedRows }, 'delete-exclusions');
          action === 'delete' && currentTab === 'subscription' && handleRequest({ ids: selectedRows }, 'delete-subscriptions');
        }}
      />
    </>
  );
};

export default ProfileTable;
