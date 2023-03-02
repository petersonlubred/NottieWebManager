import { useMemo } from 'react';

const useHeaders = () => {
  const usersheader = useMemo(() => {
    return [
      {
        key: 'firstName',
        header: 'First Name',
      },
      {
        key: 'lastName',
        header: 'lastName',
      },
      {
        key: 'email',
        header: 'Email Address',
      },
      {
        key: 'status',
        header: 'Access Status',
      },
      {
        key: 'roles',
        header: 'Role',
      },
      {
        key: 'authenticationType',
        header: 'Authentication Type',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const rolesheader = useMemo(() => {
    return [
      {
        key: 'roleName',
        header: 'Role Name',
      },
      {
        key: 'description',
        header: 'Description',
      },
      {
        key: 'users',
        header: 'Number of Users',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

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

  const smscheader = useMemo(() => {
    return [
      {
        key: 'smscName',
        header: 'SMSC Name',
      },
      {
        key: 'hostAddress',
        header: 'Host Address',
      },
      {
        key: 'systemType',
        header: 'System Type',
      },
      {
        key: 'connectionMode',
        header: 'Connection Sockets',
      },
      {
        key: 'dataEncoding',
        header: 'Data Encoding',
      },
      {
        key: 'npi',
        header: 'NPI',
      },
      {
        key: 'ton',
        header: 'TON',
      },
      {
        key: 'oNpi',
        header: 'ONPI',
      },
      {
        key: 'dNpi',
        header: 'DNPI',
      },
      {
        key: 'dTon',
        header: 'DTON',
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

  const smsrouteheader = useMemo(() => {
    return [
      {
        key: 'route_name',
        header: 'SMS Route Name',
      },
      {
        key: 'aggregator',
        header: 'Aggregator/SMSC',
      },
      {
        key: 'serviceType',
        header: 'Service Type',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const smsrouteconfigheader = useMemo(() => {
    return [
      {
        key: 'route_name',
        header: 'SMS Route Name',
      },
      {
        key: 'aggregator',
        header: 'Aggregator/SMSC',
      },
      {
        key: 'routeType',
        header: 'Route Type',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const smtpheader = useMemo(() => {
    return [
      {
        key: 'server',
        header: 'Server/Ip',
      },
      {
        key: 'port',
        header: 'Port',
      },
      {
        key: 'useSslTls',
        header: 'Use SSL/TLS',
      },
      {
        key: 'username',
        header: 'Username',
      },
      {
        key: 'emailAddress',
        header: 'Email Address',
      },
      {
        key: 'password',
        header: 'Password',
      },
      {
        key: 'displayName',
        header: 'Display Name',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const smtprouteconfigheader = useMemo(() => {
    return [
      {
        key: 'route_name',
        header: 'SMTP Route Name',
      },
      {
        key: 'smtp_name',
        header: 'SMTP Name',
      },
      {
        key: 'serviceType',
        header: 'Service Type',
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
    smscheader,
    smsrouteheader,
    smsrouteconfigheader,
    smtpheader,
    smtprouteconfigheader,
    usersheader,
    rolesheader,
  };
};

export default useHeaders;
