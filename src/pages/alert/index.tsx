import { isEmpty } from 'lodash';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import PageSubHeader from '@/components/accounts/PageSubHeader';
import AlertTable from '@/components/alert/views/AlertTable';
import Empty from '@/components/shared/Empty';
import Loader from '@/components/shared/Loader';
import Layout from '@/HOC/Layout';
import useHeaders from '@/hooks/useHeaders';
import { useGetTransactionQuery } from '@/redux/api';
import { getExtraPath, getPath } from '@/utils/helpers/helpers';
import { protectedRouteProps } from '@/utils/withSession';

const Alert = () => {
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [responseData, setResponseData] = useState<any[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const router = useRouter();
  const { tab } = router.query;
  const tabNames = ['txn-inflow', 'txn-sms', 'txn-email', 'non-txn', 'non-txn-sms', 'non-txn-email', 'otp', 'otp-sms', 'otp-email'];
  const navItems = useMemo(() => {
    return [
      { title: 'Transaction Inflow' },
      { title: 'Transaction SMS' },
      { title: 'Transaction Email' },
      { title: 'Non-Transaction' },
      { title: 'Non-Transaction SMS' },
      { title: 'Non-Transaction Email' },
      { title: 'OTP' },
      { title: 'OTP-SMS' },
      { title: 'OTP-Email' },
    ].map((item, index) => ({
      ...item,
      tabName: tabNames[index],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentTab = navItems.some((item) => item.tabName === tab) ? tab : 'txn-inflow';
  const { inflowheader, smsheader, emailheader, nontransactionheader, otpheader } = useHeaders();
  const [start, setStart] = useState<string>(moment().format('YYYY-MM-DD'));
  const [end, setEnd] = useState<string>(moment().endOf('month').format('YYYY-MM-DD'));
  const [extraPath, setExtraPath] = useState<string>('');
  const { data, isLoading } = useGetTransactionQuery(getPath({ start, end, extraPath }));

  const [filterItems, setFilterItems] = useState<{ key: string; label: string; value: string }[]>([
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

  const handleSetIndex = (index: number) => {
    setTabIndex(index);
    router.push({
      pathname: '/alert',
      query: { tab: navItems[index]?.tabName },
    });
  };

  useEffect(() => {
    if (tabIndex === 1) {
      setExtraPath(getExtraPath('Email'));
    }
  }, [tabIndex]);

  useEffect(() => {
    const headers = [inflowheader, smsheader, emailheader, nontransactionheader, smsheader, emailheader, otpheader, smsheader, emailheader].map((item, index) => ({
      data: item,
      tabName: tabNames[index],
    }));

    headers?.forEach((header) => {
      if (header.tabName === currentTab) {
        setHeaders(header.data);
      }
      const rows = responseData?.map((item: any) => {
        const row: any = {};
        const tabHeaders = headers.find((header) => header.tabName === currentTab)?.data || [];
        tabHeaders.forEach((item2: { key: string; header: string }) => {
          row[item2.key] = item[item2.key];
        });
        return row;
      });
      !rows.some((row) => row.id === undefined) && setRows(rows);
    });

    if (navItems[tabIndex].title.includes('SMS')) {
      setFilterItems([
        {
          key: 'mobile_no',
          label: 'Mobile No',
          value: '',
        },
      ]);
    } else if (navItems[tabIndex].title.includes('Email')) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailheader, inflowheader, navItems, nontransactionheader, otpheader, tabIndex, smsheader, currentTab]);

  useEffect(() => {
    if (currentTab === 'txn-sms') {
      !isEmpty(data?.data) && setResponseData(data?.data as any[]);
    } else {
      setResponseData([]);
    }
  }, [data?.data, currentTab]);

  return (
    <Layout
      routename="Alerts and Notification"
      navItem={navItems}
      currentTab={currentTab}
      handleSetIndex={handleSetIndex}
      title={'Alerts and Notification'}
      subtitle={'View all types of notification and alert activities'}
    >
      <PageSubHeader navItem={navItems[tabIndex]?.title} />
      <AlertTable Rows={Rows} Headers={Headers} tab={tabIndex} isLoading={isLoading} filterItems={filterItems} setStart={setStart} setEnd={setEnd} start={start} end={end} />
      {isLoading ? <Loader /> : isEmpty(Rows) && <Empty title={'No ' + navItems[tabIndex]?.title + ' found'} />}{' '}
    </Layout>
  );
};

export default Alert;
export const getServerSideProps: GetServerSideProps = protectedRouteProps();
