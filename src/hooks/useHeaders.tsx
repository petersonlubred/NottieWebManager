import { useMemo } from 'react';

const useHeaders = () => {
  const inflowheader = useMemo(() => {
    return [
      {
        key: 'customerId',
        header: 'Customer ID',
      },
      {
        key: 'account_no',
        header: 'Account No',
      },
      {
        key: 'narration',
        header: 'Narration',
      },
      {
        key: 'access_status',
        header: 'Access Status',
      },
      {
        key: 'transaction_date',
        header: 'Transaction Date',
      },
      {
        key: 'entry_time',
        header: 'Entry Time',
      },
      {
        key: 'process_remark',
        header: 'Process Remark',
      },
      {
        key: 'amount',
        header: 'Amount',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const smsheader = useMemo(() => {
    return [
      {
        key: 'mobile_no',
        header: 'Mobile No',
      },
      {
        key: 'network',
        header: 'Network',
      },
      {
        key: 'sent_time',
        header: 'Sent Time',
      },
      {
        key: 'delivery_time',
        header: 'Delivery Time',
      },
      {
        key: 'entry_time',
        header: 'Entry Time',
      },
      {
        key: 'smsc_route',
        header: 'SMSC Route',
      },
      {
        key: 'delivery_status',
        header: 'Delivery Status',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const emailheader = useMemo(() => {
    return [
      {
        key: 'email',
        header: 'Email Address',
      },
      {
        key: 'remark',
        header: 'Remark',
      },
      {
        key: 'sent_time',
        header: 'Sent Time',
      },
      {
        key: 'entry_time',
        header: 'Entry Time',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const nontransactionheader = useMemo(() => {
    return [
      {
        key: 'customerId',
        header: 'Customer ID',
      },
      {
        key: 'account_no',
        header: 'Account No',
      },
      {
        key: 'narration',
        header: 'Narration',
      },
      {
        key: 'access_status',
        header: 'Access Status',
      },
      {
        key: 'transaction_date',
        header: 'Transaction Date',
      },
      {
        key: 'entry_time',
        header: 'Entry Time',
      },
      {
        key: 'amount',
        header: 'Amount',
      },
      {
        key: 'process_status',
        header: 'Process Status',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const otpheader = useMemo(() => {
    return [
      {
        key: 'mobile_no',
        header: 'Mobile No',
      },
      {
        key: 'account_no',
        header: 'Account No',
      },
      {
        key: 'entry_time',
        header: 'Entry Time',
      },
      {
        key: 'amount',
        header: 'Amount',
      },
      {
        key: 'process_status',
        header: 'Process Status',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const profileheader = useMemo(() => {
    return [
      {
        key: 'profile_name',
        header: 'Profile Name',
      },
      {
        key: 'description',
        header: 'Description',
      },
      {
        key: 'template',
        header: 'Template',
      },
      {
        key: 'min_threshold',
        header: 'Email Min Threshold',
      },
      {
        key: 'status',
        header: 'Status',
      },
      {
        key: 'hide_balance',
        header: 'Hide Balance',
      },
      {
        key: 'mask_account',
        header: 'Mask Account',
      },
      {
        key: 'enable_email',
        header: 'Enable Email',
      },
      {
        key: 'enable_sms',
        header: 'Enable SMS',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const alertexceptionheader = useMemo(() => {
    return [
      {
        key: 'customer_id',
        header: 'Customer ID',
      },
      {
        key: 'account_no',
        header: 'Account No',
      },
      {
        key: 'recipient',
        header: 'Recipient',
      },
      {
        key: 'alert_medium',
        header: 'Alert Medium',
      },
      {
        key: 'alert_profile',
        header: 'Transaction Alert Profile',
      },
      {
        key: 'status',
        header: 'Status',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const alertexcludeheader = useMemo(() => {
    return [
      {
        key: 'exclusion_type',
        header: 'Exclusion Type',
      },
      {
        key: 'text_to_exclude',
        header: 'Text to exclude',
      },
      {
        key: 'operator',
        header: 'Operator',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const datasourceheader = useMemo(() => {
    return [
      {
        key: 'profile_name',
        header: 'Profile Name',
      },
      {
        key: 'description',
        header: 'Description',
      },
      {
        key: 'template',
        header: 'Template',
      },
      {
        key: 'email_min_threshold',
        header: 'Email Min Threshold',
      },
      {
        key: 'sms_min_threshold',
        header: 'SMS Min Threshold',
      },
      {
        key: 'status',
        header: 'Status',
      },
      {
        key: 'hide_balance',
        header: 'Hide Balance',
      },
      {
        key: 'mask_account',
        header: 'Mask Account',
      },
      {
        key: 'enable_email',
        header: 'Enable Email',
      },
      {
        key: 'enable_sms',
        header: 'Enable SMS',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  return {
    inflowheader,
    smsheader,
    emailheader,
    nontransactionheader,
    otpheader,
    profileheader,
    alertexceptionheader,
    alertexcludeheader,
    datasourceheader,
  };
};

export default useHeaders;
