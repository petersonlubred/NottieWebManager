import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { ConfigurationTable, DataSource, ServiceMapping, SystemSettings, Template } from '@/components/configuration';
import ActionIcons from '@/components/configuration/ActionIcons/Smtp';
import Modal from '@/components/shared/Modal';
import Layout from '@/HOC/Layout';
import useHeaders from '@/hooks/useHeaders';
import { FormikRefType } from '@/interfaces/formik.type';
import { IHeader } from '@/interfaces/role';
import { useGetSmtpserversQuery } from '@/redux/api';
import { useGetSmscQuery } from '@/redux/api/smscApi';
import { px } from '@/utils';
import { protectedRouteProps } from '@/utils/withSession';

import ModalContent from '../../components/configuration/ModalContent';
import { Ismtp, Smsc } from '@/interfaces/configuration';



const SystemConfiguration = () => {
  const [Headers, setHeaders] = useState<IHeader[]>([]);
  const [responseData, setResponseData] = useState<Ismtp[]>([]);
  const [smscResponseData, setSmscResponseData]=useState<Smsc[]>([])
  const [Rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<FormikRefType<any>>(null);
  const { data, isFetching: isLoading } = useGetSmtpserversQuery();
  const { data:smscData, isFetching: isRetrieving } = useGetSmscQuery();
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

  const { datasourceheader, smscheader, smsrouteheader, smsrouteconfigheader, smtpheader, smtprouteconfigheader } = useHeaders();

  const handleSetIndex = (index: number) => {
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
          console.log('item2',item2)
          row[item2.key] = item[item2.key];
          if (currentTab === 'smtp') {
            row.id = item['smtpId'];
            row['others'] = <ActionIcons data={item} />;
            row['useSslTls'] = item['useSslTls'] ? 'Yes' : 'No';
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
    }else if(currentTab === 'smsc'){
      !isEmpty(smscData?.data) && setSmscResponseData(smscData?.data as Smsc[]);
    } else {
      setSmscResponseData([])
      setResponseData([]);
    }
  }, [data?.data, currentTab]);

  return (
    <Layout
      routename="System Configuration"
      navItem={navItems}
      currentTab={currentTab}
      handleSetIndex={handleSetIndex}
      title={'System Configuration'}
      subtitle={'Manage System Configuration'}
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
        <ConfigurationTable navItems={navItems} Rows={Rows} Headers={Headers} tab={tabIndex} toggleModal={toggleModal} isLoading={isLoading} />
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
