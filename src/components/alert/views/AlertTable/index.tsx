import {
  DataTable,
  DataTableCustomRenderProps,
  DataTableHeader,
  DataTableSkeleton,
  DataTableSkeletonHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
} from 'carbon-components-react';
import { isEmpty } from 'lodash';
import React from 'react';

import { IPageQuery } from '@/interfaces/notification';

import TableNavItem from '../../TableNavItems';

type Props = {
  Rows: any[];
  Headers: DataTableHeader[] & DataTableSkeletonHeader[];
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
      <DataTable
        rows={Rows}
        headers={Headers}
        render={({ rows, headers, getTableProps, getToolbarProps }: DataTableCustomRenderProps) => (
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
              <DataTableSkeleton showHeader={false} showToolbar={false} compact rowCount={7} columnCount={Headers?.length - 1} headers={Headers} />
            ) : (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header: DataTableHeader, index: number) => (
                      <TableHeader key={index}>{header.header}</TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                {!isEmpty(Rows) && !isLoading && (
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
          </>
        )}
      />
    </>
  );
};

export default AlertTable;
