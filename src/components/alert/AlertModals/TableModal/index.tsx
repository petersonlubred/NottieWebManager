import React from 'react';
import styled from 'styled-components';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Pagination,
} from '@carbon/react';
import Modal from '@/components/shared/Modal';
import { px } from '@/utils';

const dummyData: any = [
  [
    { key: 'mobile_no', header: 'Mobile No' },
    { key: 'network', header: 'Network' },
    { key: 'sent_item', header: 'Sent Item' },
    { key: 'delivery_time', header: 'Delivery Time' },
    { key: 'entry_time', header: 'Entry Time' },
    { key: 'status', header: 'Status' },
  ],
  [
    {
      id: 'a',
      mobile_no: '0907865437',
      network: 'Airtel',
      sent_item: '15 May 2020 9:00 am',
      delivery_time: '15 May 2020 9:00 am',
      entry_time: '7 May 2020 1:00 pm',
      status: 'Pending',
    },
    {
      id: 'b',
      mobile_no: '0907865437',
      network: 'MTN',
      sent_item: '15 May 2020 9:00 am',
      delivery_time: '15 May 2020 9:00 am',
      entry_time: '7 May 2020 1:00 pm',
      status: 'Pending',
    },
    {
      id: 'c',
      mobile_no: '0907865437',
      network: 'Glo',
      sent_item: '15 May 2020 9:00 am',
      delivery_time: '15 May 2020 9:00 am',
      entry_time: '7 May 2020 1:00 pm',
      status: 'Delivered',
    },
    {
      id: 'd',
      mobile_no: '0907865437',
      network: 'Starlink',
      sent_item: '15 May 2020 9:00 am',
      delivery_time: '15 May 2020 9:00 am',
      entry_time: '7 May 2020 1:00 pm',
      status: 'Delivered',
    },
    {
      id: 'e',
      mobile_no: '0907865437',
      network: 'Starlink',
      sent_item: '15 May 2020 9:00 am',
      delivery_time: '15 May 2020 9:00 am',
      entry_time: '7 May 2020 1:00 pm',
      status: 'Delivered',
    },
    {
      id: 'f',
      mobile_no: '0907865437',
      network: 'Starlink',
      sent_item: '15 May 2020 9:00 am',
      delivery_time: '15 May 2020 9:00 am',
      entry_time: '7 May 2020 1:00 pm',
      status: 'Delivered',
    },
  ],
];

type IProps = {
  open?: boolean;
  toggleModal: () => void;
};

const AlertTableModal = ({ open, toggleModal }: IProps) => {
  return (
    <InputModalContainer>
      <Modal
        buttonLabel="Close"
        heading="Account no: 3910793817"
        open={open}
        toggleModal={toggleModal}
        secondaryButtonText=""
        extent="md"
      >
        <ModalContainer>
          <SubHeader>
            <Header>Customer ID: COMP1502 </Header>
            <Header>Narration: Thanks for being great! ❤️</Header>
          </SubHeader>
          <DataTable rows={dummyData[1]} headers={dummyData[0]}>
            {({ rows, headers, getHeaderProps, getTableProps }: any) => (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header: any) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: any) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell: any) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
        </ModalContainer>
        <PaginationContainer>
          <Pagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText="Items per page:"
            page={1}
            pageNumberText="Page Number"
            pageSize={10}
            pageSizes={[10, 20, 30, 40, 50]}
            totalItems={103}
          />
        </PaginationContainer>
      </Modal>
    </InputModalContainer>
  );
};

export default AlertTableModal;

const InputModalContainer = styled.div`
  .cds--modal-container--md {
    width: 926px !important;
  }

  .cds--modal .cds--pagination,
  .cds--modal .cds--pagination__control-buttons,
  .cds--modal .cds--text-input,
  .cds--modal .cds--text-area,
  .cds--modal .cds--search-input,
  .cds--modal .cds--select-input,
  .cds--modal .cds--dropdown,
  .cds--modal .cds--dropdown-list,
  .cds--modal .cds--number input[type='number'],
  .cds--modal .cds--date-picker__input,
  .cds--modal .cds--multi-select,
  .cds--modal .cds--number__control-btn::before,
  .cds--modal .cds--number__control-btn::after {
    background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
    color: ${({ theme }) => theme.colors.lightText} !important;
  }

  .cds--pagination__right .cds--pagination__text {
    color: ${({ theme }) => theme.colors.lightText} !important;
  }

  span.cds--pagination__text.cds--pagination__items-count {
    color: ${({ theme }) => theme.colors.lightText} !important;
  }

  .cds--btn--ghost:not([disabled]) svg {
    fill: ${({ theme }) => theme.colors.lightText} !important;
  }
`;

const ModalContainer = styled.div`
  .cds--data-table th {
    background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
    color: ${({ theme }) => theme.colors.lightBackground} !important;
  }

  .cds--data-table tbody tr,
  .cds--data-table tbody tr td,
  .cds--data-table tbody tr th {
    background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
    color: ${({ theme }) => theme.colors.lightBackground} !important;
  }
`;

const SubHeader = styled.div`
  display: flex;
  gap: ${px(90)};
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;
const Header = styled.div`
  position: sticky;
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-style: normal;
  font-weight: 400;
  font-size: ${px(18)};
  line-height: ${px(20)};


  letter-spacing: 0.16px;

  color: ${({ theme }) => theme.colors.lightText};

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const PaginationContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
`;
