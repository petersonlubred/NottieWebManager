import Head from 'next/head';

interface ISeo {
  title?: string;
}

const Seo = ({ title = 'Dashboard' }: ISeo) => {
  return (
    <Head>
      <title>{title} | Nottie</title>
      <link rel="shortcut icon" href="/favicon.png"></link>
    </Head>
  );
};

export default Seo;
