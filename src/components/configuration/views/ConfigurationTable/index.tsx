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
import { TrashCan, Add } from '@carbon/react/icons';
import PageSubHeader from '@/components/accounts/PageSubHeader';
import Button from '@/components/shared/Button';
import { isEmpty } from 'lodash';
import Empty from '@/components/shared/Empty';
import Loader from '@/components/shared/Loader';
import { IHeader } from '@/interfaces/role';

type Props = {
  Rows: any[];
  Headers: IHeader[];
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
                    {headers.map((header: IHeader, index: number) => (
                      <TableHeader {...getHeaderProps({ ...header })} key={index}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                {!isEmpty(Rows) && !isLoading && (
                  <TableBody>
                    {rows?.map((row: any) => (
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
      )}
      {isLoading ? <Loader /> : isEmpty(Rows) && <Empty title={'No ' + navItems[tab]?.title + ' found'} />}
    </>
  );
};

export default ConfigurationTable;
