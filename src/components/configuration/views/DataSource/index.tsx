import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

import Icon from '@/components/shared/Icons';
import Loader from '@/components/shared/Loader';
import { IDataSourceType } from '@/interfaces/configuration';
import { ConfigurationContainer, NoDataContainer, NoDataTitle } from '@/pages/configuration';
import { useGetDatasourceQuery, useGetDatasourcesQuery, useLookupDatabaseTypeQuery } from '@/redux/api';

import DataSourceContent from './DataSourceContent';
import DataSourceForm from './DataSourceForm';

const DataSource = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const { data, isFetching } = useGetDatasourcesQuery();
  const { data: databaseType, isFetching: isLoading } = useLookupDatabaseTypeQuery();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const { data: dataSource, isFetching: Loading } = useGetDatasourceQuery({ dataSourceId: id }, { skip: !id });
  const [Data, setData] = useState<IDataSourceType>();

  const handleToggleForm = () => {
    setDisplayForm(true);
    if (Data) {
      setData(undefined);
      setId('');
    } else {
      setData(dataSource?.data);
    }
  };

  useEffect(() => {
    if (dataSource?.data) {
      setData(dataSource?.data);
    }
  }, [dataSource]);

  return (
    <ConfigurationContainer>
      <DataSourceContent handleToggleForm={handleToggleForm} data={data?.data} setId={setId} id={id} />
      {isEmpty(dataSource?.data) && !displayForm && (
        <NoDataContainer>
          <Icon id="empty-drawer-icon" width={43} height={51} />
          <NoDataTitle>Select or create a new source from the left panel.</NoDataTitle>
        </NoDataContainer>
      )}
      {(!isEmpty(Data) || displayForm) && <DataSourceForm databaseType={databaseType?.data} setLoading={setLoading} data={Data} />}
      {(isFetching || isLoading || loading || Loading) && <Loader />}
    </ConfigurationContainer>
  );
};

export default DataSource;
