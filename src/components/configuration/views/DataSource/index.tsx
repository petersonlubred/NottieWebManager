import Icon from '@/components/shared/Icons';
import { ConfigurationContainer, NoDataContainer, NoDataTitle } from '@/pages/configuration';
import DataSourceContent from './DataSourceContent';
import DataSourceForm from './DataSourceForm';

const DataSource = () => {
  return (
    <ConfigurationContainer>
      <DataSourceContent />
      <NoDataContainer>
        <Icon id="empty-drawer-icon" width={43} height={51} />
        <NoDataTitle>Select or create a new source from the left panel.</NoDataTitle>
      </NoDataContainer>
      {/* <DataSourceForm /> */}
    </ConfigurationContainer>
  );
};

export default DataSource;
