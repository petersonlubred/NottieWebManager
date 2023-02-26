import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const useSelectorValue = () => {
  const { notifications } = useSelector((state: RootState) => state.sharedReducer);
  return { notifications };
};

export default useSelectorValue;
