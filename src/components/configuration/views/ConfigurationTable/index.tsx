import { Add, TrashCan } from '@carbon/icons-react';
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
import React from 'react';

import PageSubHeader from '@/components/accounts/PageSubHeader';
import Button from '@/components/shared/Button';
import Empty from '@/components/shared/Empty';
import Loader from '@/components/shared/Loader';

type Props = {
  Rows: any[];
  Headers: DataTableHeader[] & DataTableSkeletonHeader[];
  tab: number;
  toggleModal: () => void;
  isLoading: boolean;
  navItems: { title: string }[];
};

const ConfigurationTable = ({ Rows, Headers, tab, toggleModal, isLoading, navItems }: Props) => {
  return (
    <>
      <PageSubHeader navItem={navItems[tab]?.title} />
      {isLoading ? (
        <DataTableSkeleton showHeader={false} showToolbar={false} compact rowCount={7} columnCount={Headers?.length - 1} headers={Headers} />
      ) : (
        <DataTable
          rows={Rows}
          headers={Headers}
          render={({ rows, headers, getTableProps, getSelectionProps, getToolbarProps, getBatchActionProps }: DataTableCustomRenderProps) => (
            <>
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    renderIcon={TrashCan}
                    iconDescription="Delete the selected rows"
                    // onClick={console.log(selectedRows)}
                  >
                    Delete
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent>
                  <Button
                    renderIcon={(props: any) => <Add size={20} {...props} />}
                    buttonLabel={`Create ${navItems[tab]?.title.split(' ').join(' ')}`}
                    handleClick={() => tab !== 1 && toggleModal()}
                  />
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header: DataTableHeader, index: number) => (
                      <TableHeader key={index}>{header.header}</TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                {!isEmpty(Rows) && !isLoading && (
                  <TableBody>
                    {rows?.map((row: any) => (
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
      )}

      {isLoading ? <Loader /> : isEmpty(Rows) && <Empty title={'No ' + navItems[tab]?.title + ' found'} />}
    </>
  );
};

export default ConfigurationTable;
