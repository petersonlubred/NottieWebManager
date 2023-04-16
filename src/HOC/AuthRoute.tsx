import { NextRouter, useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

const AuthRoute = ({ children, isPublic }: PropsWithChildren & { isPublic?: boolean }) => {
  const router: NextRouter = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  if (isPublic && user) {
    router.push('/dashboard');
  } else if (!isPublic && !user) {
    router.push('/');
  }
  return <>{children}</>;
};

export default AuthRoute;
