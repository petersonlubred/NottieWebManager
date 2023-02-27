import { NextApiHandler } from 'next';

import { withSessionRoute } from '@/utils/withSession';

const logoutRoute: NextApiHandler<{ ok: boolean }> = async (req, res) => {
  req.session.destroy();
  res.send({ ok: true });
};

export default withSessionRoute(logoutRoute);
