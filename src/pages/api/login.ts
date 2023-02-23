import { NextApiHandler } from 'next';
import { withSessionRoute } from '@/utils/withSession';

const loginRoute: NextApiHandler<{ ok: boolean }> = async (req, res) => {
  //Save user session serverside
  req.session.user = req.body.data.user;
  req.session.token = req.body.data.token;
  await req.session.save();
  res.send({ ok: true });
};

export default withSessionRoute(loginRoute);
