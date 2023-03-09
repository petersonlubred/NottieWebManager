import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import PageSubHeader from '@/components/accounts/PageSubHeader';
import ActionIcons from '@/components/alert/ActionIcons';
import AlertTable from '@/components/alert/views/AlertTable';
import Empty from '@/components/shared/Empty';
import Loader from '@/components/shared/Loader';
import { initialPaginationData, IPaginationData } from '@/components/shared/PageFooter';
import Layout from '@/HOC/Layout';
import useHeaders from '@/hooks/useHeaders';
import { EmailData, initialPageQuery, IPageQuery, NonTransaction, OtpData, SmsData, TransactionData } from '@/interfaces/notification';
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
import { getPath, pickValues } from '@/utils/helpers/helpers';
import { protectedRouteProps } from '@/utils/withSession';

const Alert = () => {
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [notArchive, setNotArchive] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<OtpData[] | TransactionData[] | NonTransaction[] | EmailData[] | SmsData[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const router = useRouter();
  const { tab } = router.query;
  const [renderDate, setRenderDate] = useState(false);
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
  const [start, setStart] = useState<string | undefined>();
  const [end, setEnd] = useState<string | undefined>();
  const [query, setQuery] = useState<IPageQuery>(initialPageQuery);
  const [paginationData, setPaginationData] = useState<IPaginationData>(initialPaginationData);
  const { data, isFetching: isLoading } = useGetTransactionQuery(
    { extraPath: getPath({ start, end }), ...pickValues({ ...query, notArchive: '' }) },
    { skip: currentTab !== 'txn' || !start || !end }
  );
  const {
    data: transactionSms,
    isFetching: isLoadingTransactionSms,
    isError: isErrorTransactionSms,
    error: errorTransactionSms,
  } = useGetTransactionSMSQuery({ extraPath: getPath({ start, end }), ...pickValues(query) }, { skip: currentTab !== 'txn-sms' || !start || !end });
  const {
    data: transactionEmail,
    isFetching: isLoadingTransactionEmail,
    isError,
    error,
  } = useGetTransactionEmailQuery({ extraPath: getPath({ start, end }), ...pickValues(query) }, { skip: currentTab !== 'txn-email' || !start || !end });

  const { data: NTransaction, isFetching: isNTLoading } = useGetNonTransactionQuery(
    { extraPath: getPath({ start, end }), ...pickValues({ ...query, notArchive: '' }) },
    { skip: currentTab !== 'non-txn' || !start || !end }
  );
  const {
    data: NTransactionSms,
    isFetching: isLoadingNTransactionSms,
    isError: isErrorNTransactionSms,
    error: errorNTransactionSms,
  } = useGetNonTransactionSMSQuery({ extraPath: getPath({ start, end }), ...pickValues(query) }, { skip: currentTab !== 'non-txn-sms' || !start || !end });
  const {
    data: NTransactionEmail,
    isFetching: isLoadingNTransactionEmail,
    isError: isErrorNTransactionEmail,
    error: errorNTransactionEmail,
  } = useGetNonTransactionEmailQuery({ extraPath: getPath({ start, end }), ...pickValues(query) }, { skip: currentTab !== 'non-txn-email' || !start || !end });

  const { data: otp, isFetching: isotpLoading } = useGetOtpQuery(
    { extraPath: getPath({ start, end }), ...pickValues({ ...query, notArchive: '' }) },
    { skip: currentTab !== 'otp' || !start || !end }
  );
  const {
    data: otpsms,
    isFetching: isOtpSMSLoading,
    isError: isErrorOtpSms,
    error: errorOtpSms,
  } = useGetOtpSMSQuery({ extraPath: getPath({ start, end }), ...pickValues(query) }, { skip: currentTab !== 'otp-sms' || !start || !end });
  const {
    data: otpemail,
    isFetching: isOtpEmailLoading,
    isError: isErrorOtpEmail,
    error: errorOtpEmail,
  } = useGetOtpEmailQuery({ extraPath: getPath({ start, end }), ...pickValues(query) }, { skip: currentTab !== 'otp-email' || !start || !end });

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

  const handleResetDate = () => {
    setRenderDate(!renderDate);
    setStart(undefined);
    setEnd(undefined);
  };

  const handleSetIndex = (index: number) => {
    setTabIndex(index);
    handleResetDate();
    router.push({
      pathname: '/alert',
      query: { tab: navItems[index]?.tabName },
    });
  };

  useEffect(() => {
    setQuery(initialPageQuery);
    setNotArchive(true);
  }, [currentTab]);

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
          row.id = item.transactionId ?? item.otpId ?? item.noneTransactionId ?? item.messageId;
          row.useTemplate = item?.useTemplate ? 'Yes' : 'No';
          row.sendReceipt = item?.sendReceipt ? 'Yes' : 'No';
          row['others'] = <ActionIcons data={item} currentTab={currentTab as string} start={start} end={end} tabNames={tabNames} />;
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
      if (isErrorTransactionSms && errorTransactionSms && 'status' in errorTransactionSms) {
        setResponseData([]), setPaginationData(initialPaginationData);
        return;
      }
      !isEmpty(transactionSms?.data?.data)
        ? (setResponseData(transactionSms?.data?.data as SmsData[]), setPaginationData(transactionSms?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'txn-email') {
      if (isError && error && 'status' in error) {
        setResponseData([]), setPaginationData(initialPaginationData);
        return;
      }
      !isEmpty(transactionEmail?.data?.data)
        ? (setResponseData(transactionEmail?.data?.data as EmailData[]), setPaginationData(transactionEmail?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'non-txn') {
      !isEmpty(NTransaction?.data?.data)
        ? (setResponseData(NTransaction?.data?.data as NonTransaction[]), setPaginationData(NTransaction?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'non-txn-sms') {
      if (isErrorNTransactionSms && errorNTransactionSms && 'status' in errorNTransactionSms) {
        setResponseData([]), setPaginationData(initialPaginationData);
        return;
      }
      !isEmpty(NTransactionSms?.data?.data)
        ? (setResponseData(NTransactionSms?.data?.data as SmsData[]), setPaginationData(NTransactionSms?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'non-txn-email') {
      if (isErrorNTransactionEmail && errorNTransactionEmail && 'status' in errorNTransactionEmail) {
        setResponseData([]), setPaginationData(initialPaginationData);
        return;
      }
      !isEmpty(NTransactionEmail?.data?.data)
        ? (setResponseData(NTransactionEmail?.data?.data as EmailData[]), setPaginationData(NTransactionEmail?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'otp') {
      !isEmpty(otp?.data?.data)
        ? (setResponseData(otp?.data?.data as OtpData[]), setPaginationData(otp?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'otp-sms') {
      if (isErrorOtpSms && errorOtpSms && 'status' in errorOtpSms) {
        setResponseData([]), setPaginationData(initialPaginationData);
        return;
      }
      !isEmpty(otpsms?.data?.data)
        ? (setResponseData(otpsms?.data?.data as SmsData[]), setPaginationData(otpsms?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else if (currentTab === 'otp-email') {
      if (isErrorOtpEmail && errorOtpEmail && 'status' in errorOtpEmail) {
        setResponseData([]), setPaginationData(initialPaginationData);
        return;
      }
      !isEmpty(otpemail?.data?.data)
        ? (setResponseData(otpemail?.data?.data as EmailData[]), setPaginationData(otpemail?.data.meta as IPaginationData))
        : (setResponseData([]), setPaginationData(initialPaginationData));
    } else {
      setResponseData([]);
      setPaginationData(initialPaginationData);
    }
  }, [
    data?.data?.data,
    currentTab,
    transactionSms?.data,
    transactionEmail?.data,
    NTransaction?.data,
    NTransactionSms?.data,
    NTransactionEmail?.data,
    otp?.data,
    otpsms?.data,
    otpemail?.data,
    data?.data.meta,
    tabIndex,
    isError,
    error,
    isErrorTransactionSms,
    errorTransactionSms,
    isErrorNTransactionSms,
    errorNTransactionSms,
    isErrorNTransactionEmail,
    errorNTransactionEmail,
    errorOtpEmail,
    isErrorOtpSms,
    errorOtpSms,
    isErrorOtpEmail,
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
        renderDate={renderDate}
        query={query}
        setQuery={setQuery}
        displayToday={tabIndex === 1 || tabIndex === 2 || tabIndex === 4 || tabIndex === 5 || tabIndex === 7 || tabIndex === 8}
        notArchive={notArchive}
        setNotArchive={setNotArchive}
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
