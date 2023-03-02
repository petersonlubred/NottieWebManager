import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import PageSubHeader from '@/components/accounts/PageSubHeader';
import { AccessStatus, ActionIcons } from '@/components/profile';
import ExceptionModalContent from '@/components/profile/ExceptionModalContent';
import ExcludeModalContent from '@/components/profile/ExcludeContent';
import ModalContent from '@/components/profile/ProfileModalContent';
import SubscriptionModalContent from '@/components/profile/SubscriptionContent';
import UploadContent from '@/components/profile/UploadContent';
import ProfileTable from '@/components/profile/views/ProfileTable';
import Empty from '@/components/shared/Empty';
import Loader from '@/components/shared/Loader';
import Modal from '@/components/shared/Modal';
import SimpleModalcontent from '@/components/shared/SimpleModalContent/SimpleModalContent';
import Layout from '@/HOC/Layout';
import { useDebounce } from '@/hooks/useDebounce';
import useHeaders from '@/hooks/useHeaders';
import { AlertExceptionData, AlertExclusionData, AlertProfileData, AlertSubscriptionData } from '@/interfaces/alert';
import { FormikRefType } from '@/interfaces/formik.type';
import { useGetExceptionQuery, useGetExclusionQuery, useGetProfileQuery, useGetSubscriptionQuery } from '@/redux/api';
import { initialAlertException, initialAlertExclude, initialAlertProfileValue, initialSubscription } from '@/schemas/dto';
import { protectedRouteProps } from '@/utils/withSession';

const Profile = () => {
  const [Headers, setHeaders] = useState<any[]>([]);
  const [Rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [bulkopen, setBulkOpen] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<AlertProfileData[] | AlertExceptionData[] | AlertExclusionData[] | AlertSubscriptionData[]>([]);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const formRef = useRef<FormikRefType<any>>(null);
  const router = useRouter();
  const { tab } = router.query;
  const tabNames = ['alert-profile', 'exception', 'exclude', 'subscription'];

  const navItems = useMemo(() => {
    return [{ title: 'Transaction Alert Profile' }, { title: 'Transaction Alert Exception' }, { title: 'Transaction Alert Exclude' }, { title: 'Subscription' }].map(
      (item, index) => ({
        ...item,
        tabName: tabNames[index],
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentTab = navItems.find((item) => item.tabName === tab) ? tab : 'alert-profile';
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

  const [filterData, setFilterData] = useState({});
  const debounceFilter = useDebounce(filterData, 500);

  const { data: profiles, isFetching: isFetchingProfiles } = useGetProfileQuery({}, { skip: currentTab !== 'alert-profile' });
  const { data: exceptions, isFetching: isFetchingExceptions } = useGetExceptionQuery({ ...debounceFilter }, { skip: currentTab !== 'exception' });
  const { data: exclusions, isFetching: isFetchingExclusions } = useGetExclusionQuery({ ...debounceFilter }, { skip: currentTab !== 'exclude' });
  const { data: subscriptions, isFetching: isFetchingSubscriptions } = useGetSubscriptionQuery({ ...debounceFilter }, { skip: currentTab !== 'subscription' });

  const { profileheader, alertexceptionheader, alertexcludeheader } = useHeaders();

  const handleSetIndex = (index: number) => {
    setTabIndex(index);
    router.push({
      pathname: '/profile',
      query: { tab: navItems[index]?.tabName },
    });
  };

  const toggleModal = () => {
    let resetData;
    if (currentTab === 'alert-profile') {
      resetData = initialAlertProfileValue;
    } else if (currentTab === 'exception') {
      resetData = initialAlertException;
    } else if (currentTab === 'exclude') {
      resetData = initialAlertExclude;
    } else {
      resetData = initialSubscription;
    }
    formRef.current?.resetForm({ values: resetData });
    setOpen(!open);
  };
  const handleSubmit = () => {
    formRef.current?.handleSubmit();
  };

  const toggleBulkModal = () => {
    let resetData;
    if (currentTab === 'alert-profile') {
      resetData = initialAlertProfileValue;
    } else if (currentTab === 'exception') {
      resetData = initialAlertException;
    } else if (currentTab === 'exclude') {
      resetData = initialAlertExclude;
    } else {
      resetData = initialSubscription;
    }
    formRef.current?.resetForm({ values: resetData });
    setBulkOpen(!bulkopen);
  };

  useEffect(() => {
    setFilterData({});
  }, [currentTab]);

  useEffect(() => {
    const headers = [profileheader, alertexceptionheader, alertexcludeheader, alertexceptionheader].map((item, index) => ({
      data: item,
      tabName: tabNames[index],
    }));

    headers?.forEach((header) => {
      if (header.tabName === currentTab) {
        setHeaders(header.data);
      }

      const rows = responseData.map((item: any) => {
        const row: any = {};
        const tabHeaders = headers.find((header) => header.tabName === currentTab)?.data || [];
        tabHeaders.forEach((item2: { key: string; header: string }) => {
          row[item2.key] = item[item2.key];
          if (currentTab === 'alert-profile') {
            row['others'] = <ActionIcons data={item} currentTab={currentTab} />;
            row['status'] = <AccessStatus active={item['status']} useDefault={false} activated="Active" notActivated="Not Active" />;
            row['enableSms'] = item.enableSms ? 'Yes' : 'No';
            row['enableEmail'] = item.enableEmail ? 'Yes' : 'No';
            row['hideBalance'] = item.hideBalance ? 'Yes' : 'No';
            row['maskAccount'] = item.maskAccount ? 'Yes' : 'No';
            row.id = item['alertProfileId'];
          } else {
            row['others'] = <ActionIcons data={item} currentTab={currentTab as string} />;
            row['status'] = <AccessStatus active={item['status']} />;
          }
          if (currentTab === 'exception') {
            row.id = item['alertExceptionId'];
          } else if (currentTab === 'exclude') {
            row.id = item['alertExcludeId'];
          } else if (currentTab === 'subscription') {
            row.id = item['alertSubscriptionId'];
          }
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
  }, [alertexceptionheader, alertexcludeheader, currentTab, navItems, profileheader, tabIndex, responseData]);

  useEffect(() => {
    if (currentTab === 'alert-profile') {
      !isEmpty(profiles?.data?.data) && setResponseData(profiles?.data?.data as AlertProfileData[]);
    } else if (currentTab === 'exception') {
      !isEmpty(exceptions?.data?.data) ? setResponseData(exceptions?.data?.data as AlertExceptionData[]) : setResponseData([]);
    } else if (currentTab === 'exclude') {
      !isEmpty(exclusions?.data?.data) ? setResponseData(exclusions?.data?.data as AlertExclusionData[]) : setResponseData([]);
    } else {
      !isEmpty(subscriptions?.data?.data) ? setResponseData(subscriptions?.data?.data as AlertSubscriptionData[]) : setResponseData([]);
    }
  }, [currentTab, profiles?.data?.data, exceptions?.data.data, exclusions?.data.data, subscriptions?.data?.data, tabIndex]);

  return (
    <Layout
      routename="Profile & Subscriptions"
      navItem={navItems}
      currentTab={currentTab}
      handleSetIndex={handleSetIndex}
      title={'Profile & Subscriptions'}
      subtitle={'Create and manage profile and permissions and subscription'}
    >
      <Modal
        heading={`Create ${tabIndex === 3 ? 'New' : 'Alert'} ${navItems[tabIndex]?.title.split(' ')[navItems[tabIndex]?.title.split(' ').length - 1]}`}
        buttonLabel={`Create ${navItems[tabIndex]?.title.split(' ')[navItems[tabIndex]?.title.split(' ').length - 1]}`}
        open={open}
        toggleModal={toggleModal}
        onRequestSubmit={handleSubmit}
      >
        {tabIndex === 0 ? (
          <ModalContent formRef={formRef} toggleModal={toggleModal} />
        ) : tabIndex === 1 ? (
          <ExceptionModalContent formRef={formRef} toggleModal={toggleModal} />
        ) : tabIndex === 2 ? (
          <ExcludeModalContent formRef={formRef} toggleModal={toggleModal} />
        ) : (
          <SubscriptionModalContent formRef={formRef} toggleModal={toggleModal} />
        )}
      </Modal>
      <Modal heading={`Bulk Upload`} buttonLabel={`Upload`} open={bulkopen} toggleModal={toggleBulkModal}>
        <SimpleModalcontent content={<UploadContent />} />
      </Modal>
      <PageSubHeader navItem={navItems[tabIndex]?.title} />
      <ProfileTable
        Rows={Rows}
        Headers={Headers}
        toggleModal={toggleModal}
        toggleBulkModal={toggleBulkModal}
        setFilterData={setFilterData}
        filterData={filterData}
        isLoading={isFetchingProfiles || isFetchingExceptions || isFetchingExclusions || isFetchingSubscriptions}
        currentTab={currentTab}
        filterItems={filterItems}
        navItems={navItems}
        tabIndex={tabIndex}
      />
      {isFetchingProfiles || isFetchingExceptions || isFetchingExclusions || isFetchingSubscriptions ? (
        <Loader />
      ) : (
        isEmpty(Rows) && <Empty title={'No ' + navItems[tabIndex].title + ' found'} />
      )}
    </Layout>
  );
};

export default Profile;
export const getServerSideProps: GetServerSideProps = protectedRouteProps();
