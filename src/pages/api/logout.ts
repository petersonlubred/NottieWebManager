import { NextApiHandler } from 'next';

const logoutRoute: NextApiHandler<{ ok: boolean }> = async (req, res) => {
  req.session.destroy();
  res.send({ ok: true });
};

export default logoutRoute;
