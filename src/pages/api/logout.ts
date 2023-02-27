import { withSessionRoute } from '@/utils/withSession';
import { NextApiHandler } from 'next';

const logoutRoute: NextApiHandler<{ ok: boolean }> = async (req, res) => {
  req.session.destroy();
  res.send({ ok: true });
};

export default withSessionRoute(logoutRoute);
