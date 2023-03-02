import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import PageSubHeader from '@/components/accounts/PageSubHeader';
import AlertTable from '@/components/alert/views/AlertTable';
import Empty from '@/components/shared/Empty';
import Loader from '@/components/shared/Loader';
import { initialPaginationData, IPaginationData } from '@/components/shared/PageFooter';
import Layout from '@/HOC/Layout';
import useHeaders from '@/hooks/useHeaders';
import { initialPageQuery, IPageQuery, TransactionData } from '@/interfaces/notification';
import {
  useGetNonTransactionEmailQuery,
  useGetNonTransactionQuery,
  useGetNonTransactionSMSQuery,
  useGetOtpEmailQuery,
  useGetOtpQuery,
  useGetOtpSMSQuery,
  useGetTransactionEmailQuery,
  useGetTransactionQuery,
  useGetTransactionSMSQuery,
} from '@/redux/api';
import { getPath, initialAlertEndDate, initialAlertStartDate, pickValues } from '@/utils/helpers/helpers';
import { protectedRouteProps } from '@/utils/withSession';

const Alert = () => {
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [responseData, setResponseData] = useState<any[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const router = useRouter();
  const { tab } = router.query;
  const tabNames = ['txn', 'txn-sms', 'txn-email', 'non-txn', 'non-txn-sms', 'non-txn-email', 'otp', 'otp-sms', 'otp-email'];
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

  const currentTab = navItems.some((item) => item.tabName === tab) ? tab : 'txn';
  const { inflowheader, smsheader, emailheader, nontransactionheader, otpheader } = useHeaders();
  const [start, setStart] = useState<string>(initialAlertStartDate);
  const [end, setEnd] = useState<string>(initialAlertEndDate);
  const [query, setQuery] = useState<IPageQuery>(initialPageQuery);
  const [paginationData, setPaginationData] = useState<IPaginationData>(initialPaginationData);
  const { data, isFetching: isLoading } = useGetTransactionQuery({ extraPath: getPath({ start, end }), ...pickValues(query) }, { skip: currentTab !== 'txn' });
  const { data: transactionSms, isFetching: isLoadingTransactionSms } = useGetTransactionSMSQuery(
    { extraPath: getPath({ start, end }), ...pickValues(query) },
    { skip: currentTab !== 'txn-sms' }
  );
  const { data: transactionEmail, isFetching: isLoadingTransactionEmail } = useGetTransactionEmailQuery(
    { extraPath: getPath({ start, end }), ...pickValues(query) },
    { skip: currentTab !== 'txn-email' }
  );
  const { data: NTransaction, isFetching: isNTLoading } = useGetNonTransactionQuery(
    { extraPath: getPath({ start, end }), ...pickValues(query) },
    { skip: currentTab !== 'non-txn' }
  );
  const { data: NTransactionSms, isFetching: isLoadingNTransactionSms } = useGetNonTransactionSMSQuery(
    { extraPath: getPath({ start, end }), ...pickValues(query) },
    { skip: currentTab !== 'non-txn-sms' }
  );
  const { data: NTransactionEmail, isFetching: isLoadingNTransactionEmail } = useGetNonTransactionEmailQuery(
    { extraPath: getPath({ start, end }), ...pickValues(query) },
    { skip: currentTab !== 'non-txn-email' }
  );
  const { data: otp, isFetching: isotpLoading } = useGetOtpQuery({ extraPath: getPath({ start, end }), ...pickValues(query) }, { skip: currentTab !== 'otp' });
  const { data: otpsms, isFetching: isOtpSMSLoading } = useGetOtpSMSQuery({ extraPath: getPath({ start, end }), ...pickValues(query) }, { skip: currentTab !== 'otp-sms' });
  const { data: otpemail, isFetching: isOtpEmailLoading } = useGetOtpEmailQuery({ extraPath: getPath({ start, end }), ...pickValues(query) }, { skip: currentTab !== 'otp-email' });

  const [filterItems, setFilterItems] = useState<{ key: string; label: string; value: string }[]>([
    {
      key: 'customerId',
      label: 'Customer ID',
      value: '',
    },
    {
      key: 'accountNo',
      label: 'Account Number',
      value: '',
    },
  ]);

  useEffect(() => {
    setQuery(initialPageQuery);
    setStart(initialAlertStartDate);
    setEnd(initialAlertEndDate);
  }, [currentTab]);

  const handleSetIndex = (index: number) => {
    setTabIndex(index);
    router.push({
      pathname: '/alert',
      query: { tab: navItems[index]?.tabName },
    });
  };

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
          row.id = item.transactionId;
        });
        return row;
      });

      !rows.some((row) => row.id === undefined) && setRows(rows);
    });

    if (navItems[tabIndex].title.includes('SMS')) {
      setFilterItems([
        {
          key: 'mobile',
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
          key: 'customerId',
          label: 'Customer ID',
          value: '',
        },
        {
          key: 'accountNo',
          label: 'Account Number',
          value: '',
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailheader, inflowheader, navItems, nontransactionheader, otpheader, tabIndex, smsheader, currentTab, responseData]);

  useEffect(() => {
    if (currentTab === 'txn') {
      !isEmpty(data?.data?.data)
        ? (setResponseData(data?.data?.data as TransactionData[]), setPaginationData(data?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'txn-sms') {
      !isEmpty(transactionSms?.data?.data)
        ? (setResponseData(transactionSms?.data?.data as TransactionData[]), setPaginationData(data?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'txn-email') {
      !isEmpty(transactionEmail?.data?.data)
        ? (setResponseData(transactionEmail?.data?.data as TransactionData[]), setPaginationData(data?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'non-txn') {
      !isEmpty(NTransaction?.data?.data)
        ? (setResponseData(NTransaction?.data?.data as TransactionData[]), setPaginationData(data?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'non-txn-sms') {
      !isEmpty(NTransactionSms?.data?.data)
        ? (setResponseData(NTransactionSms?.data?.data as TransactionData[]), setPaginationData(data?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'non-txn-email') {
      !isEmpty(NTransactionEmail?.data?.data)
        ? (setResponseData(NTransactionEmail?.data?.data as TransactionData[]), setPaginationData(data?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'otp') {
      !isEmpty(otp?.data?.data)
        ? (setResponseData(otp?.data?.data as TransactionData[]), setPaginationData(data?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'otp-sms') {
      !isEmpty(otpsms?.data?.data)
        ? (setResponseData(otpsms?.data?.data as TransactionData[]), setPaginationData(data?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'otp-email') {
      !isEmpty(otpemail?.data?.data)
        ? (setResponseData(otpemail?.data?.data as TransactionData[]), setPaginationData(data?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else {
      setResponseData([]);
      setPaginationData(initialPaginationData);
    }
  }, [
    data?.data?.data,
    currentTab,
    transactionSms?.data?.data,
    transactionEmail?.data?.data,
    NTransaction?.data?.data,
    NTransactionSms?.data?.data,
    NTransactionEmail?.data?.data,
    otp?.data?.data,
    otpsms?.data?.data,
    otpemail?.data?.data,
    data?.data?.meta,
  ]);

  return (
    <Layout
      routename="Alerts and Notification"
      navItem={navItems}
      currentTab={currentTab}
      handleSetIndex={handleSetIndex}
      title={'Alerts and Notification'}
      subtitle={'View all types of notification and alert activities'}
      paginationData={paginationData}
      setQuery={setQuery}
    >
      <PageSubHeader navItem={navItems[tabIndex]?.title} />
      <AlertTable
        Rows={Rows}
        Headers={Headers}
        tab={tabIndex}
        isLoading={
          isLoading ||
          isLoadingTransactionSms ||
          isLoadingTransactionEmail ||
          isLoadingNTransactionSms ||
          isLoadingNTransactionEmail ||
          isNTLoading ||
          isotpLoading ||
          isOtpSMSLoading ||
          isOtpEmailLoading
        }
        filterItems={filterItems}
        setStart={setStart}
        setEnd={setEnd}
        start={start}
        end={end}
        query={query}
        setQuery={setQuery}
      />
      {isLoading ||
      isLoadingTransactionSms ||
      isLoadingTransactionEmail ||
      isLoadingNTransactionSms ||
      isLoadingNTransactionEmail ||
      isNTLoading ||
      isotpLoading ||
      isOtpSMSLoading ||
      isOtpEmailLoading ? (
        <Loader />
      ) : (
        isEmpty(Rows) && <Empty title={'No ' + navItems[tabIndex]?.title + ' found'} />
      )}{' '}
    </Layout>
  );
};

export default Alert;
export const getServerSideProps: GetServerSideProps = protectedRouteProps();
