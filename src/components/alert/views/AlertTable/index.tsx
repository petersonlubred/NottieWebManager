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

import { IPageQuery } from '@/interfaces/notification';
import { IHeader } from '@/interfaces/role';

import TableNavItem from '../../TableNavItems';

type Props = {
  Rows: any[];
  Headers: IHeader[];
  tab: number;
  isLoading: boolean;
  setStart: React.Dispatch<React.SetStateAction<string | undefined>>;
  setEnd: React.Dispatch<React.SetStateAction<string | undefined>>;
  start?: string;
  end?: string;
  filterItems: {
    key: string;
    value: string;
    label: string;
  }[];
  setQuery: React.Dispatch<React.SetStateAction<IPageQuery>>;
  query: IPageQuery;
  renderDate?: boolean;
  notArchive?: boolean;
  setNotArchive?: React.Dispatch<React.SetStateAction<boolean>>;
  displayToday?: boolean;
};

const AlertTable = ({ Rows, Headers, isLoading, filterItems, setEnd, setStart, start, end, setQuery, query, renderDate, notArchive, setNotArchive, displayToday }: Props) => {
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
                <TableNavItem
                  renderDate={renderDate}
                  filterItems={filterItems}
                  setStart={setStart}
                  setEnd={setEnd}
                  startDate={start}
                  setQuery={setQuery}
                  query={query}
                  endDate={end}
                  displayToday={displayToday}
                  notArchive={notArchive}
                  setNotArchive={setNotArchive}
                />
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
