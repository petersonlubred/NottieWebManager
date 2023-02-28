import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import BackgroundService from '@/components/dashboard/BackgroundService';
import SmsandEmail from '@/components/dashboard/SmsAndEmail';
import Layout from '@/HOC/Layout';
import { px } from '@/utils';
import { protectedRouteProps } from '@/utils/withSession';

const Dashboard = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { tab } = router.query;
  const tabNames = ['background-service', 'sms-email'];
  const navItems = useMemo(() => {
    return [{ title: 'Background service' }, { title: 'SMS & Email' }].map((item, index) => ({
      ...item,
      tabName: tabNames[index],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const currentTab = navItems.some((item) => item.tabName === tab) ? tab : 'background-service';

  const handleSetIndex = (index: number) => {
    setTabIndex(index);
    router.push({
      pathname: '/dashboard',
      query: { tab: navItems[index]?.tabName },
    });
  };

  return (
    <Layout
      routename="Dashboard"
      navItem={navItems}
      currentTab={currentTab}
      handleSetIndex={handleSetIndex}
      title={'Dashboard'}
      subtitle={'Last sync: Today 3:09PM'}
      isDashboard
      noPagination
    >
      {tabIndex === 0 ? <BackgroundService /> : <SmsandEmail />}
    </Layout>
  );
};

export default Dashboard;
export const getServerSideProps: GetServerSideProps = protectedRouteProps();

export const TextIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(6)};
`;

export const Box = styled.div<{ color: string }>`
  width: ${px(8)};
  height: ${px(6)};
  background-color: ${(props) => props.color};
`;
