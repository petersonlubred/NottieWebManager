import { At, Email, View } from '@carbon/react/icons';
import { useState } from 'react';
import styled from 'styled-components';

import { IconBox } from '@/components/configuration/ActionIcons/Smtp';
import EmailContent from '@/components/shared/EmailContent';
import Modal from '@/components/shared/Modal';
import SimpleModalcontent from '@/components/shared/SimpleModalContent/SimpleModalContent';
import { EmailData, NonTransaction, OtpData, TransactionData } from '@/interfaces/notification';
import {
  useGetNonTransactionEmailByIdQuery,
  useGetNonTransactionSMSByIdQuery,
  useGetOtpEmailByIdQuery,
  useGetOtpSMSByIdQuery,
  useGetSingleNonTransactionEmailQuery,
  useGetSingleNonTransactionSMSQuery,
  useGetSingleOtpEmailQuery,
  useGetSingleOtpSMSQuery,
  useGetSingleTransactionEmailQuery,
  useGetSingleTransactionSMSQuery,
  useGetTransactionEmailByIdQuery,
  useGetTransactionSMSByIdQuery,
} from '@/redux/api';
import { px } from '@/utils';
import { getExtraPath, getPath } from '@/utils/helpers/helpers';

import AlertTableModal from '../AlertModals/TableModal';

type Props = {
  data?: TransactionData & EmailData & NonTransaction & OtpData;
  currentTab?: string;
  start?: string;
  end?: string;
  tabNames?: string[];
};

const ActionIcons = ({ data, start, currentTab, end, tabNames }: Props) => {
  const [action, setAction] = useState('');
  const { data: emails, isFetching: isLoadingEmails } = useGetTransactionEmailByIdQuery(
    { extraPath: getPath({ start, extraPath: getExtraPath(['Email', data?.transactionId as string]) }), notArchive: true },
    { skip: (!start || !data?.transactionId) && action !== 'txnemail' }
  );
  const { data: sms, isFetching: isLoadingSms } = useGetTransactionSMSByIdQuery(
    { extraPath: getPath({ start, extraPath: getExtraPath(['Sms', data?.transactionId as string]) }), notArchive: true },
    { skip: (!start || !data?.transactionId) && action !== 'txnsms' }
  );
  const { data: NEmails, isFetching: isLoadingNEmails } = useGetNonTransactionEmailByIdQuery(
    { extraPath: getPath({ start, extraPath: getExtraPath(['Email', data?.noneTransactionId as string]) }), notArchive: true },
    { skip: (!start || !data?.noneTransactionId) && action !== 'nontxnmail' }
  );
  const { data: NSms, isFetching: isLoadingNSms } = useGetNonTransactionSMSByIdQuery(
    { extraPath: getPath({ start, extraPath: getExtraPath(['Sms', data?.noneTransactionId as string]) }), notArchive: true },
    { skip: (!start || !data?.noneTransactionId) && action !== 'nontxnsms' }
  );
  const { data: OtpEmails, isFetching: isLoadingOtpEmails } = useGetOtpEmailByIdQuery(
    { extraPath: getPath({ start, extraPath: getExtraPath(['Email', data?.otpId as string]) }), notArchive: true },
    { skip: (!start || !data?.otpId) && action !== 'otpemail' }
  );
  const { data: Otpsms, isFetching: isLoadingOtpSms } = useGetOtpSMSByIdQuery(
    { extraPath: getPath({ start, extraPath: getExtraPath(['Sms', data?.otpId as string]) }), notArchive: true },
    { skip: (!start || !data?.otpId) && action !== 'otpsms' }
  );
  const { data: singleEmail, isFetching: isLoadingSingleEmail } = useGetSingleTransactionEmailQuery(
    { extraPath: getPath({ start, end, extraPath: getExtraPath(['Email', data?.messageId as string]) }), notArchive: true },
    { skip: (!start || !end) && (action !== 'previewtxnemail' || !data?.messageId) }
  );
  const { data: singleSms, isFetching: isLoadingSingleSms } = useGetSingleTransactionSMSQuery(
    { extraPath: getPath({ start, end, extraPath: getExtraPath(['Sms', data?.messageId as string]) }), notArchive: true },
    { skip: (!start || !end) && (action !== 'previewtxnsms' || !data?.messageId) }
  );
  const { data: singleNEmail, isFetching: isLoadingSingleNEmail } = useGetSingleNonTransactionEmailQuery(
    { extraPath: getPath({ start, end, extraPath: getExtraPath(['Email', data?.messageId as string]) }), notArchive: true },
    { skip: (!start || !end) && (action !== 'previewnontxnemail' || !data?.messageId) }
  );
  const { data: singleNSms, isFetching: isLoadingSingleNSms } = useGetSingleNonTransactionSMSQuery(
    { extraPath: getPath({ start, end, extraPath: getExtraPath(['Sms', data?.messageId as string]) }), notArchive: true },
    { skip: (!start || !end) && (action !== 'previewnontxnsms' || !data?.messageId) }
  );
  const { data: singleOtpEmail, isFetching: isLoadingSingleOtpEmail } = useGetSingleOtpEmailQuery(
    { extraPath: getPath({ start, end, extraPath: getExtraPath(['Email', data?.messageId as string]) }), notArchive: true },
    { skip: (!start || !end) && (action !== 'previewotpemail' || !data?.messageId) }
  );
  const { data: singleOtpSms, isFetching: isLoadingSingleOtpSms } = useGetSingleOtpSMSQuery(
    { extraPath: getPath({ start, end, extraPath: getExtraPath(['Sms', data?.messageId as string]) }), notArchive: true },
    { skip: (!start || !end) && (action !== 'previewotpsms' || !data?.messageId) }
  );

  const toggleModal = () => {
    setAction('');
  };

  return (
    <NavSectionTwo>
      {currentTab === 'txn' || currentTab === 'non-txn' || currentTab === 'otp' ? (
        <>
          <IconBox
            onClick={() => {
              tabNames?.includes(currentTab as string) && setAction(`${currentTab?.split('-').join('')}sms`);
            }}
          >
            <Email size={20} />
          </IconBox>
          <IconBox
            onClick={() => {
              tabNames?.includes(currentTab as string) && setAction(`${currentTab?.split('-').join('')}email`);
            }}
          >
            <At size={20} />
          </IconBox>
        </>
      ) : (
        <IconBox
          onClick={() => {
            tabNames?.includes(currentTab as string) && setAction(`preview${currentTab?.split('-').join('')}`);
          }}
        >
          <View size={20} />
        </IconBox>
      )}

      <Modal heading={`Mobile No: ${data?.mobile}`} buttonLabel={'Close'} open={action?.endsWith('sms')} toggleModal={toggleModal} extent="sm" onRequestSubmit={toggleModal}>
        <SimpleModalcontent
          content={
            action === 'previewtxnsms' ? singleSms?.data?.sms : action === 'previewnontxnsms' ? singleNSms?.data?.sms : action === 'previewotpsms' ? singleOtpSms?.data?.sms : ''
          }
          isLoading={isLoadingSingleSms || isLoadingSingleSms || isLoadingSingleNSms || isLoadingSingleOtpSms}
        />
      </Modal>

      <Modal heading={`Email address: ${data?.email}`} buttonLabel={'Close'} open={action?.endsWith('email')} toggleModal={toggleModal} extent="md" onRequestSubmit={toggleModal}>
        <EmailContent
          content={
            action === 'previewtxnemail'
              ? singleEmail?.data?.email
              : action === 'previewnontxnemail'
              ? singleNEmail?.data?.email
              : action === 'previewotpemail'
              ? singleOtpEmail?.data?.email
              : ''
          }
          isLoading={isLoadingSingleEmail || isLoadingSingleEmail || isLoadingSingleNEmail || isLoadingSingleOtpEmail}
          subject={singleEmail?.data?.subject}
        />
      </Modal>
      <Modal
        buttonLabel="Close"
        heading={`Account no: ${data?.accountNo}`}
        extent="md"
        open={action === `${currentTab?.split('-').join('')}sms` || action === `${currentTab?.split('-').join('')}email`}
        toggleModal={toggleModal}
        onRequestSubmit={toggleModal}
      >
        <AlertTableModal
          transactionData={data}
          action={action}
          data={
            action === 'txnemail'
              ? emails?.data
              : action === 'txnsms'
              ? sms?.data
              : action === 'nontxnemail'
              ? NEmails?.data
              : action === 'nontxnsms'
              ? NSms?.data
              : action === 'otpemail'
              ? OtpEmails?.data
              : Otpsms?.data
          }
          isLoading={isLoadingEmails || isLoadingSms || isLoadingNEmails || isLoadingNSms || isLoadingOtpEmails || isLoadingOtpSms}
        />
      </Modal>
    </NavSectionTwo>
  );
};

export default ActionIcons;

const NavSectionTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${px(12)};

  .btn-primary {
    background-color: transparent !important;
    color: ${(props) => props.theme.colors.white} !important;
    padding: calc(0.875rem - 3px) 33px calc(0.875rem - 3px) 15px !important;

    &:hover {
      background-color: ${(props) => props.theme.colors.bgHover} !important;
    }
  }
`;
