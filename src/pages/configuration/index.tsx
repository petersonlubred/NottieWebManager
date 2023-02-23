import PageSubHeader from '@/components/accounts/PageSubHeader';
import Layout from '@/HOC/Layout';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  Loading,
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
import SMSCForm from '@/components/configuration/Forms/SMSC';
import SMSRoute from '@/components/configuration/Forms/SMSRoute';
import SMSRouteConfig from '@/components/configuration/Forms/SMSRouteConfig';
import SMTP from '@/components/configuration/Forms/SMTP';
import SMTPRoute from '@/components/configuration/Forms/SMTPRoute';
import { FormikRefType } from '@/interfaces/formik.type';
import Loader from '@/components/shared/Loader';
import { useLazyGetSmtpserverQuery } from '@/redux/services';
import ActionIcons from '@/components/configuration/Smtp/ActionIcons';
import { initialSMTPValue } from '@/interfaces/dtos';

const SystemConfiguration = () => {
  const [selected, setSelected] = useState(0);
  const [Headers, setHeaders] = useState<any[]>([]);
  const [responseData, setResponseData] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<FormikRefType<any>>(null);
  const [triggerSMTP, { data, isFetching: isLoading }] =
    useLazyGetSmtpserverQuery();

  const {
    datasourceheader,
    smscheader,
    smsrouteheader,
    smsrouteconfigheader,
    smtpheader,
    smtprouteconfigheader,
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
    index === 6 && triggerSMTP({}, true);
  };

  const handleSubmit = () => {
    formRef.current?.handleSubmit();
  };

  useEffect(() => {
    const headers = [
      datasourceheader,
      datasourceheader,
      datasourceheader,
      smscheader,
      smsrouteheader,
      smsrouteconfigheader,
      smtpheader,
      smtprouteconfigheader,
    ];

    headers?.forEach((header, index) => {
      if (index === selected) {
        setHeaders(header);
      }
      const rows = responseData?.map((item: any) => {
        const row: any = {};
        headers[selected].forEach((item2: { key: string; header: string }) => {
          row[item2.key] = item[item2.key];
          if (selected === 6) {
            row.id = item['smtpId'];
            row['others'] = (
              <ActionIcons
                data={item}
              />
            );
            row['useSslTls'] = item['useSslTls'] ? 'Yes' : 'No';
          }
        });
        return row;
      });
      rows && setRows([...rows]);
    });
  }, [
    datasourceheader,
    navItems,
    selected,
    smscheader,
    smsrouteheader,
    smsrouteconfigheader,
    smtpheader,
    smtprouteconfigheader,
    responseData,
  ]);

  const toggleModal = () => {
    formRef.current?.resetForm();
    setOpen(!open);
  };

  useEffect(() => {
    selected == 6 ? setResponseData(data?.data) : setResponseData([]);
  }, [data?.data, selected]);

  return (
    <Layout
      routename="System Configuration"
      navItem={navItems}
      selected={selected}
      handleSetIndex={handleSetIndex}
      title={'System Configuration'}
      subtitle={'Manage System Configuration'}
    >
      <Modal
        buttonTriggerText={''}
        buttonIcon={(props: any) => <Add size={24} {...props} />}
        heading={`Create New ${navItems[selected]?.title.split(' ').join(' ')}`}
        buttonLabel={`Create ${navItems[selected]?.title.split(' ').join(' ')}`}
        open={open}
        toggleModal={toggleModal}
        extent="sm"
        onRequestSubmit={handleSubmit}
      >
        {selected === 3 ? (
          <SMSCForm />
        ) : selected === 4 ? (
          <SMSRoute />
        ) : selected === 5 ? (
          <SMSRouteConfig />
        ) : selected === 6 ? (
          <SMTP
            formRef={formRef}
            toggleModal={toggleModal}
          />
        ) : (
          <SMTPRoute />
        )}
      </Modal>

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

      {selected !== 0 && selected !== 2 && (
        <>
          <PageSubHeader navItem={navItems[selected]?.title} />
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
                      buttonLabel={`Create ${navItems[selected]?.title
                        .split(' ')
                        .join(' ')}`}
                      handleClick={() => selected !== 1 && toggleModal()}
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
          {/* {isEmpty(Rows) && (
            <Empty title={'No ' + navItems[selected].title + ' found'} />
          )} */}
          {isLoading && <Loader />}
        </>
      )}
      {/* <ConfigurationContainer> */}
      {/* <DataSource /> */}
      {/* <NoDataContainer>
              <Icon id="empty-drawer-icon" width={43} height={51} />
              <NoDataTitle>
                Select or create a new source from the left panel.
              </NoDataTitle>
            </NoDataContainer> */}
      {/* <DataSourceForm /> */}
      {/* </ConfigurationContainer> */}

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
          {/* <DetailsForm isSSO={false} /> */}
          <SeqLogForm />
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
  line-height: ${px(34)};
  margin-bottom: ${px(16)};
  width: ${px(383)};
  text-align: center;
`;
