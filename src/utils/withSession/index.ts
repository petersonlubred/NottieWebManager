import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next';

import { UserData } from '@/interfaces/user';
import { setAuth } from '@/redux/slices/auth';
import { wrapper } from '@/redux/store';

declare module 'iron-session' {
  interface IronSessionData {
    user?: UserData;
    token?: string;
  }
}

const sessionOptions = {
  password: process.env.NEXT_SESSION_PASSWORD || '',
  cookieName: 'nottie_user',
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (_context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}

export const protectedRouteProps = (isAuthPage = false) =>
  withSessionSsr(
    wrapper.getServerSideProps((store) => async ({ req }) => {
      if (isAuthPage) {
        if (req.session?.user && req.session?.token) {
          return {
            redirect: {
              destination: `/dashboard`,
              permanent: false,
            },
          };
        } else {
          return {
            props: {
              user: null,
            },
          };
        }
      } else {
        if (req.session?.user && req.session?.token) {
          store.dispatch(setAuth({ user: req.session.user, token: req.session.token }));
          return {
            props: {
              user: req.session?.user,
            },
          };
        } else {
          return {
            redirect: {
              destination: `/`,
              permanent: false,
            },
          };
        }
      }
    })
  );
