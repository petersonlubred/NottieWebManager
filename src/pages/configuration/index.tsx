import PageSubHeader from '@/components/accounts/PageSubHeader';
import Layout from '@/HOC/Layout';
import React, { useEffect, useMemo, useState } from 'react';
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
} from '@carbon/react';
import { TrashCan, Add } from '@carbon/react/icons';
import { isEmpty } from 'lodash';
import Empty from '@/components/shared/Empty';
import useHeaders from '@/hooks/useHeaders';
import styled from 'styled-components';
import Template from '@/components/configuration/Template';
import { px } from '@/utils';
import MailBody from '@/components/configuration/MailBody';
import TagSection from '@/components/configuration/TagSection';
import Modal from '@/components/shared/Modal';
import Button from '@/components/shared/Button';
import Icon from '@/components/shared/Icons';
import DataSource from '@/components/configuration/DataSource';
import DataSourceForm from '@/components/configuration/DataSourceForm';
import ServiceMapping from '@/components/configuration/ServiceMapping';
import BatchProcessingForm from '@/components/configuration/SystemSettings/BatchProcessingForm';
import SystemSettingSideBar from '@/components/configuration/SystemSettings/SystemSettingSideBar/indx';
import CheckBoxForm from '@/components/configuration/SystemSettings/CheckboxForm';
import DetailsForm from '@/components/configuration/SystemSettings/DetailsForm';
import SeqLogForm from '@/components/configuration/SystemSettings/SeqLogForm';

const SystemConfiguration = () => {
  const [selected, setSelected] = useState(0);
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [filterItems, setFilterItems] = useState<
    { key: string; label: string; value: string }[]
  >([
    {
      key: 'customer_id',
      label: 'Customer ID',
      value: '',
    },
    {
      key: 'account_no',
      label: 'Account Number',
      value: '',
    },
  ]);

  const {
    datasourceheader,
    smsheader,
    emailheader,
    nontransactionheader,
    otpheader,
  } = useHeaders();

  const navItems = useMemo(() => {
    return [
      { title: 'Template' },
      { title: 'Data Source' },
      { title: 'Service Mapping' },
      { title: 'SMSC' },
      { title: 'SMS Route' },
      { title: 'SMS Route Config' },
      { title: 'SMTP' },
      { title: 'SMTP Route' },
      { title: 'System Settings' },
    ];
  }, []);

  const handleSetIndex = (index: number) => {
    setSelected(index);
  };

  useEffect(() => {
    const headers = [
      datasourceheader,
      datasourceheader,
      emailheader,
      nontransactionheader,
      smsheader,
      emailheader,
      otpheader,
      smsheader,
      emailheader,
    ];
    headers?.forEach((header, index) => {
      if (index === selected) {
        setHeaders(header);
      }
      const data: any[] = [];
      const rows = data.map((item: any) => {
        const row: any = {};
        headers[selected].forEach((item2: { key: string; header: string }) => {
          row[item2.key] = item[item2.key];
        });
        return row;
      });
      setRows(rows);
    });

    if (navItems[selected].title.includes('SMS')) {
      setFilterItems([
        {
          key: 'mobile_no',
          label: 'Mobile No',
          value: '',
        },
      ]);
    } else if (navItems[selected].title.includes('Email')) {
      setFilterItems([
        {
          key: 'email',
          label: 'Email',
          value: '',
        },
      ]);
    } else {
      setFilterItems([
        {
          key: 'customer_id',
          label: 'Customer ID',
          value: '',
        },
        {
          key: 'account_no',
          label: 'Account Number',
          value: '',
        },
      ]);
    }
  }, [
    emailheader,
    datasourceheader,
    navItems,
    nontransactionheader,
    otpheader,
    selected,
    smsheader,
  ]);

  return (
    <Layout
      routename="System Configuration"
      navItem={navItems}
      selected={selected}
      handleSetIndex={handleSetIndex}
      title={'System Configuration'}
      subtitle={'Manage System Configuration'}
    >
      {selected === 0 && (
        <ConfigurationContainer>
          <Template />
          {/* <NoDataContainer>
          <Icon id="empty-drawer-icon" width={43} height={51} />
          <NoDataTitle>
            Select or create a template from the left panel and you can see it
            here.
          </NoDataTitle>
        </NoDataContainer>*/}
          <MailBody /> <TagSection />
        </ConfigurationContainer>
      )}

      {selected === 1 && (
        <>
          {/* <PageSubHeader navItem={navItems[selected]?.title} />
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
            }: any) => (
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
                      buttonLabel={`Create ${
                        navItems[selected]?.title.split(' ')[
                          navItems[selected]?.title.split(' ').length - 1
                        ]
                      }`}
                      handleClick={() => null}
                    />
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header: any, index: number) => (
                        <TableHeader
                          {...getHeaderProps({ header })}
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
          {isEmpty(Rows) && (
            <Empty title={'No ' + navItems[selected].title + ' found'} />
          )} */}
          <ConfigurationContainer>
            <DataSource />
            {/* <NoDataContainer>
              <Icon id="empty-drawer-icon" width={43} height={51} />
              <NoDataTitle>
                Select or create a new source from the left panel.
              </NoDataTitle>
            </NoDataContainer> */}
            <DataSourceForm />
          </ConfigurationContainer>
        </>
      )}

      {selected === 2 && (
        <ConfigurationContainer>
          <ServiceMapping />
        </ConfigurationContainer>
      )}

      {selected === 8 && (
        <ConfigurationContainer>
          <SystemSettingSideBar />
          {/* <BatchProcessingForm /> */}
          {/* <CheckBoxForm isDesc={true} /> */}
          <DetailsForm isSSO={false} />
          {/* <SeqLogForm /> */}
        </ConfigurationContainer>
      )}
    </Layout>
  );
};

export default SystemConfiguration;

const ConfigurationContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  align-items: flex-start;
`;

const NoDataContainer = styled.div`
  padding: ${px(40)} 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  margin-top: ${px(100)};
`;

const NoDataTitle = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-size: ${px(26)};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${px(29)};
  line-height: ${px(34)}
  margin-bottom: ${px(16)};
  width: ${px(383)};
  text-align:center;
  
`;
