import { DataTableHeader, DataTableSkeletonHeader } from 'carbon-components-react';
import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { ConfigurationTable, DataSource, ServiceMapping, SystemSettings, Template } from '@/components/configuration';
import ActionIconsSmsc, { StatusIcon } from '@/components/configuration/ActionIcons/Smsc';
import ActionIconsSmscRoute from '@/components/configuration/ActionIcons/SmscRoute';
import ActionIconsSmscConfig from '@/components/configuration/ActionIcons/SmscRouteConfig';
import ActionIcons from '@/components/configuration/ActionIcons/Smtp';
import ActionIconsSmtpRoute from '@/components/configuration/ActionIcons/SmtpRoute';
import Modal from '@/components/shared/Modal';
import Layout from '@/HOC/Layout';
import useHeaders from '@/hooks/useHeaders';
import { Ismtp, Smsc, SmscRoute, SmscRouteConfig, SmtpRoute } from '@/interfaces/configuration';
import { FormikRefType } from '@/interfaces/formik.type';
import { useGetSmtpRouteServersQuery, useGetSmtpserversQuery } from '@/redux/api';
import { useGetSmscRouteQuery } from '@/redux/api';
import { useGetSmscRouteConfigQuery } from '@/redux/api';
import { useGetSmscQuery } from '@/redux/api/smscApi';
import { px } from '@/utils';
import { protectedRouteProps } from '@/utils/withSession';

import ModalContent from '../../components/configuration/ModalContent';

const SystemConfiguration = () => {
  const [Headers, setHeaders] = useState<DataTableHeader[] & DataTableSkeletonHeader[]>([]);
  const [responseData, setResponseData] = useState<Ismtp[] | Smsc[] | SmscRoute[] | SmscRouteConfig[] | SmtpRoute[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<FormikRefType<any>>(null);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const router = useRouter();
  const { tab } = router.query;
  const navItems = useMemo(() => {
    return [
      { title: 'Template', tabName: 'template' },
      { title: 'Data Source', tabName: 'data-source' },
      { title: 'Service Mapping', tabName: 'service-mapping' },
      { title: 'SMSC', tabName: 'smsc' },
      { title: 'SMS Route', tabName: 'sms-route' },
      { title: 'SMS Route Config', tabName: 'sms-route-config' },
      { title: 'SMTP', tabName: 'smtp' },
      { title: 'SMTP Route', tabName: 'smtp-route' },
      { title: 'System Settings', tabName: 'system-settings' },
    ];
  }, []);

  const currentTab = navItems.some((item) => item.tabName === tab) ? tab : 'template';

  const { data, isFetching: isLoading } = useGetSmtpserversQuery(undefined, { skip: currentTab !== 'smtp' });
  const { data: smscData, isFetching: isRetrieving } = useGetSmscQuery(undefined, { skip: currentTab !== 'smsc' });
  const { data: smscRouteData, isFetching: isLoadingRoute } = useGetSmscRouteQuery(undefined, { skip: currentTab !== 'sms-route' });
  const { data: smscConfigData, isFetching: isLoadingConfig } = useGetSmscRouteConfigQuery(undefined, { skip: currentTab !== 'sms-route-config' });
  const { data: smtpRouteData, isFetching: isLoadingSmtpRoute } = useGetSmtpRouteServersQuery(undefined, { skip: currentTab !== 'smtp-route' });

  const { datasourceheader, smscheader, smsrouteheader, smsrouteconfigheader, smtpheader, smtprouteconfigheader } = useHeaders();

  const handleSetIndex = (index: number) => {
    if (index !== tabIndex) setResponseData([]);
    setTabIndex(index);
    router.push({
      pathname: '/configuration',
      query: { tab: navItems[index]?.tabName },
    });
  };

  const handleSubmit = () => {
    formRef.current?.handleSubmit();
  };

  const toggleModal = () => {
    formRef.current?.resetForm();
    setOpen(!open);
  };

  useEffect(() => {
    const headers = [
      { tabName: 'template' },
      { tabName: 'data-source' },
      { tabName: 'service-mapping' },
      { data: smscheader, tabName: 'smsc' },
      { data: smsrouteheader, tabName: 'sms-route' },
      { data: smsrouteconfigheader, tabName: 'sms-route-config' },
      { data: smtpheader, tabName: 'smtp' },
      { data: smtprouteconfigheader, tabName: 'smtp-route' },
      { tabName: 'system-settings' },
    ];
    headers?.forEach((header) => {
      if (header.tabName === currentTab && header.data) {
        setHeaders(header.data);
      }
      const rows = responseData?.map((item: any) => {
        const row: any = {};
        const tabHeaders = headers.find((header) => header.tabName === currentTab)?.data || [];
        tabHeaders.forEach((item2: { key: string; header: string }) => {
          row[item2.key] = item[item2.key];
          if (currentTab === 'smtp') {
            row.id = item['smtpId'];
            row['others'] = <ActionIcons data={item} />;
            row['useSslTls'] = item['useSslTls'] ? 'Yes' : 'No';
          } else if (currentTab === 'smsc') {
            row.id = item['smscId'];
            row['others'] = <ActionIconsSmsc data={item} />;
            row['status'] = item['status'] ? <StatusIcon status="Active" /> : <StatusIcon status="Inactive" />;
          } else if (currentTab === 'sms-route') {
            row.id = item['smscRouteId'];
            row['others'] = <ActionIconsSmscRoute data={item} />;
          } else if (currentTab === 'sms-route-config') {
            row.id = item['smscRouteConfigId'];
            row['others'] = <ActionIconsSmscConfig data={item} />;
          } else if (currentTab === 'smtp-route') {
            row.id = item['smtpRouteId'];
            row['others'] = <ActionIconsSmtpRoute data={item} />;
          }
        });
        return row;
      });
      !rows.some((row) => row.id === undefined) && setRows(rows);
    });
  }, [datasourceheader, navItems, tab, smscheader, smsrouteheader, smsrouteconfigheader, smtpheader, smtprouteconfigheader, responseData, currentTab]);

  useEffect(() => {
    if (currentTab === 'smtp') {
      !isEmpty(data?.data) && setResponseData(data?.data as Ismtp[]);
    } else if (currentTab === 'smsc') {
      !isEmpty(smscData?.data) && setResponseData(smscData?.data as Smsc[]);
    } else if (currentTab === 'sms-route') {
      !isEmpty(smscRouteData?.data) && setResponseData(smscRouteData?.data as SmscRoute[]);
    } else if (currentTab === 'sms-route-config') {
      !isEmpty(smscConfigData?.data) && setResponseData(smscConfigData?.data as SmscRouteConfig[]);
    } else if (currentTab === 'smtp-route') {
      !isEmpty(smtpRouteData?.data) && setResponseData(smtpRouteData?.data as SmtpRoute[]);
    } else {
      setResponseData([]);
    }
  }, [data?.data, currentTab, smscData?.data, smscRouteData?.data, smscConfigData?.data, smtpRouteData?.data]);

  return (
    <Layout
      routename="System Configuration"
      navItem={navItems}
      currentTab={currentTab}
      handleSetIndex={handleSetIndex}
      title={'System Configuration'}
      subtitle={'Manage System Configuration'}
      noPagination={currentTab === 'data-source' || currentTab === 'template' || currentTab === 'service-mapping'}
    >
      <Modal
        heading={`Create New ${navItems[tabIndex]?.title.split(' ').join(' ')}`}
        buttonLabel={`Create ${navItems[tabIndex]?.title.split(' ').join(' ')}`}
        open={open}
        toggleModal={toggleModal}
        extent="sm"
        onRequestSubmit={handleSubmit}
      >
        <ModalContent tab={tabIndex} formRef={formRef} toggleModal={toggleModal} />
      </Modal>
      {currentTab !== 'template' && currentTab !== 'data-source' && currentTab !== 'service-mapping' && currentTab !== 'system-settings' && (
        <ConfigurationTable
          navItems={navItems}
          Rows={Rows}
          Headers={Headers}
          tab={tabIndex}
          toggleModal={toggleModal}
          isLoading={isLoading || isRetrieving || isLoadingRoute || isLoadingConfig || isLoadingSmtpRoute}
        />
      )}
      {currentTab === 'template' && <Template />}
      {currentTab === 'data-source' && <DataSource />}
      {currentTab === 'service-mapping' && <ServiceMapping />}
      {currentTab === 'system-settings' && <SystemSettings />}
    </Layout>
  );
};

export default SystemConfiguration;
export const getServerSideProps: GetServerSideProps = protectedRouteProps();

export const ConfigurationContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  align-items: flex-start;
`;

export const NoDataContainer = styled.div`
  padding: ${px(40)} 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  margin-top: ${px(100)};
`;

export const NoDataTitle = styled.p`
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
