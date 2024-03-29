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
        key: 'emailAddress',
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
        key: 'accountNo',
        header: 'Account No',
      },
      {
        key: 'narration',
        header: 'Narration',
      },
      {
        key: 'transactionDate',
        header: 'Transaction Date',
      },
      {
        key: 'entryDate',
        header: 'Entry Time',
      },
      {
        key: 'processRemark',
        header: 'Process Remark',
      },
      {
        key: 'transactionAmount',
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
        key: 'entryDate',
        header: 'Entry Time',
      },
      {
        key: 'customerId',
        header: 'Customer ID',
      },
      {
        key: 'mobile',
        header: 'Mobile No',
      },
      {
        key: 'natworkName',
        header: 'Network',
      },
      {
        key: 'sentDate',
        header: 'Sent Time',
      },
      {
        key: 'deliveryDate',
        header: 'Delivery Time',
      },
      {
        key: 'deliveryStatus',
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
        key: 'customerId',
        header: 'Customer ID',
      },
      {
        key: 'accountNo',
        header: 'Account No',
      },
      {
        key: 'email',
        header: 'Email Address',
      },
      {
        key: 'subject',
        header: 'Subject',
      },
      {
        key: 'processRemark',
        header: 'Remark',
      },
      {
        key: 'sentTime',
        header: 'Sent Time',
      },
      {
        key: 'entryDate',
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
        key: 'accountNo',
        header: 'Account No',
      },
      {
        key: 'email',
        header: 'Email Address',
      },
      {
        key: 'mobile',
        header: 'Mobile No',
      },

      {
        key: 'entryDate',
        header: 'Entry Time',
      },
      {
        key: 'processedDate',
        header: 'Processed Date',
      },
      {
        key: 'processRemark',
        header: 'Processed Remark',
      },
      {
        key: 'sendReceipt',
        header: 'Send Receipt',
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
        key: 'customerId',
        header: 'Customer ID',
      },
      {
        key: 'mobile',
        header: 'Mobile No',
      },
      {
        key: 'email',
        header: 'Email Address',
      },
      {
        key: 'accountNo',
        header: 'Account No',
      },
      {
        key: 'entryDate',
        header: 'Entry Time',
      },
      {
        key: 'processedDate',
        header: 'Processed Date',
      },

      {
        key: 'processRemark',
        header: 'Process Remark',
      },
      {
        key: 'useTemplate',
        header: 'Use Template',
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
        key: 'profileName',
        header: 'Profile Name',
      },
      {
        key: 'templateName',
        header: 'Template',
      },
      {
        key: 'emailMinThreshhold',
        header: 'Email Min Threshold',
      },
      {
        key: 'smsMinThreshhold',
        header: 'Sms Min Threshold',
      },
      {
        key: 'status',
        header: 'Status',
      },
      {
        key: 'hideBalance',
        header: 'Hide Balance',
      },
      {
        key: 'maskAccount',
        header: 'Mask Account',
      },
      {
        key: 'enableEmail',
        header: 'Enable Email',
      },
      {
        key: 'enableSms',
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
        key: 'customerId',
        header: 'Customer ID',
      },
      {
        key: 'accountNo',
        header: 'Account No',
      },
      {
        key: 'recipient',
        header: 'Recipient',
      },
      {
        key: 'alertType',
        header: 'Alert Medium',
      },
      {
        key: 'alertProfile',
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
        key: 'excludeType',
        header: 'Exclusion Type',
      },
      {
        key: 'excludeValue',
        header: 'Text to exclude',
      },
      {
        key: 'excludeOperator',
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
        key: 'smscRouteName',
        header: 'SMS Route Name',
      },
      {
        key: 'smscName',
        header: 'Aggregator/SMSC',
      },
      {
        key: 'seviceType',
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
        key: 'routeName',
        header: 'SMS Route Name',
      },
      {
        key: 'smscName',
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
        key: 'routeName',
        header: 'SMTP Route Name',
      },
      {
        key: 'smtpServer',
        header: 'SMTP Name',
      },
      {
        key: 'serviceTypeName',
        header: 'Service Type',
      },
      {
        key: 'others',
        header: '',
      },
    ];
  }, []);

  const emailmodalheader = useMemo(() => {
    return [
      {
        key: 'email',
        header: 'Email Address',
      },
      {
        key: 'subject',
        header: 'Subject',
      },
      {
        key: 'sentTime',
        header: 'Sent Time',
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
    emailmodalheader,
  };
};

export default useHeaders;
