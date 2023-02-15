import Layout from '@/HOC/Layout';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { px } from '@/utils';

import BackgroundService from '@/components/dashboard/BackgroundService';
import SmsandEmail from '@/components/dashboard/SmsAndEmail';

const Dashboard = () => {
  const [selected, setSelected] = useState(0);

  const navItems = useMemo(() => {
    return [{ title: 'Background service' }, { title: 'SMS & Email' }];
  }, []);

  const handleSetIndex = (index: number) => {
    setSelected(index);
  };

  return (
    <Layout
      routename="Dashboard"
      navItem={navItems}
      selected={selected}
      handleSetIndex={handleSetIndex}
      title={'Dashboard'}
      subtitle={'Last sync: Today 3:09PM'}
      isDashboard
      noPagination
    >
      {selected === 0 ? <BackgroundService /> : <SmsandEmail />}
    </Layout>
  );
};

export default Dashboard;

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
