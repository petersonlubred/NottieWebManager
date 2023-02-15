import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import EmailDeliveryStatus from './EmailDeliveryStatus';
import OutBoundSmcStatus from './OutBoundSmcStatus';
import SmsDeliveryStatus from './SMSDeliveryStatus';

const deliveryItems = [
  'Transaction SMS Delivery',
  'Non-Transaction SMS Delivery',
  'OTP SMS Delivery',
];
const SmsandEmail = () => {
  return (
    <>
      <DeliveryContainer>
        {deliveryItems?.map((item, index) => (
          <SmsDeliveryStatus key={index} heading={item} />
        ))}{' '}
      </DeliveryContainer>
      <ProgressStatusContainer>
        <OutBoundSmcStatus />
        <EmailDeliveryStatus />
      </ProgressStatusContainer>
    </>
  );
};

export default SmsandEmail;

const ProgressStatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.white};
  gap: ${px(16)};
  margin-bottom: ${px(16)};
`;

const DeliveryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: ${({ theme }) => theme.colors.white};
  gap: ${px(16)};
  margin-bottom: ${px(16)};
  width: 100%;
`;
