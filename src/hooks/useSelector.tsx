import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

const useSelectorValue = () => {
  const { notifications } = useSelector((state: RootState) => state.sharedReducer);
  return { notifications };
};

export default useSelectorValue;
