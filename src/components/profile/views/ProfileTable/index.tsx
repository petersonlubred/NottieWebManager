import { Add, TrashCan, Upload } from '@carbon/icons-react';
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
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarContent,
} from 'carbon-components-react';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

import TableNavItem from '@/components/alert/TableNavItems';
import Button from '@/components/shared/Button';
import useNetworkRequest from '@/hooks/useNetworkRequest';
import { IPageQuery } from '@/interfaces/notification';

import ActionModal from '../../ActionModals';

type Props = {
  Rows: any[];
  Headers: DataTableHeader[] & DataTableSkeletonHeader[];
  toggleModal: () => void;
  isLoading: boolean;
  currentTab: string | string[] | undefined;
  tabIndex: number;
  filterItems: any[];
  navItems: any[];
  setQuery: React.Dispatch<React.SetStateAction<IPageQuery>>;
  query: IPageQuery;
  toggleBulkModal: () => void;
};

const ProfileTable = ({ Rows, Headers, toggleModal, isLoading, currentTab, tabIndex, filterItems, toggleBulkModal, navItems, setQuery, query }: Props) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [action, setAction] = useState<string>('');

  const toggleActionModal = () => {
    setAction('');
  };

  const { handleRequest, loading } = useNetworkRequest(toggleActionModal);

  return isLoading ? (
    <DataTableSkeleton showHeader={false} showToolbar={false} compact rowCount={7} columnCount={Headers?.length - 1} headers={Headers} />
  ) : (
    <>
      <DataTable
        rows={Rows}
        headers={Headers}
        render={({ rows, headers, getTableProps, getSelectionProps, getToolbarProps, getBatchActionProps, selectedRows }: DataTableCustomRenderProps) => (
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
                {tabIndex != 0 && tabIndex != 2 && <TableNavItem filterItems={filterItems} setQuery={setQuery} query={query} noDateRange />}
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
                    <TableHeader key={index}>{header.header}</TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              {!isEmpty(Rows) && (
                <TableBody>
                  {rows.map((row: any) => (
                    <TableRow key={row.id}>
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
      />

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
