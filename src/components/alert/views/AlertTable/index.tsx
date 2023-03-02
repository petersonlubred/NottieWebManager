import {
  DataTable,
  DataTableSkeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderProps,
  TableProps,
  TableRow,
  TableRowProps,
  TableToolbar,
  TableToolbarContent,
  TableToolbarProps,
} from '@carbon/react';
import { isEmpty } from 'lodash';
import React from 'react';

import { IHeader } from '@/interfaces/role';

import TableNavItem from '../../TableNavItems';

type Props = {
  Rows: any[];
  Headers: IHeader[];
  tab: number;
  isLoading: boolean;
  setStart: React.Dispatch<React.SetStateAction<string>>;
  setEnd: React.Dispatch<React.SetStateAction<string>>;
  start: string;
  end: string;
  filterItems: {
    key: string;
    value: string;
    label: string;
  }[];
};

const AlertTable = ({ Rows, Headers, isLoading, filterItems, setEnd, setStart, start, end }: Props) => {
  return (
    <>
      <DataTable rows={Rows} headers={Headers}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
          getToolbarProps,
        }: {
          rows: any[];
          headers: IHeader[];
          getHeaderProps: (_props: IHeader) => TableHeaderProps;
          getRowProps: (_props: any) => TableRowProps;
          getTableProps: () => TableProps;
          getToolbarProps: () => TableToolbarProps;
        }) => (
          <>
            <TableToolbar {...getToolbarProps()}>
              <TableToolbarContent>
                <TableNavItem filterItems={filterItems} setStart={setStart} setEnd={setEnd} startDate={start} endDate={end} />
              </TableToolbarContent>
            </TableToolbar>
            {isLoading ? (
              <DataTableSkeleton showHeader={false} showToolbar={false} size="compact" rowCount={7} columnCount={Headers?.length - 1} headers={Headers} />
            ) : (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
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
                        {row.cells.map((cell: any) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            )}
          </>
        )}
      </DataTable>
    </>
  );
};

export default AlertTable;
