import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const useSelectorValue = () => {
  const { tab } = useSelector((state: RootState) => state.sharedReducer);
  return { tab };
};

export default useSelectorValue;
