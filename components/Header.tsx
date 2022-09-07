import Head from "next/head";

const Header = () => {
  return (
    <Head>
      <title>{`clog`}</title>
      <meta property="og:title" content="Page title" key="title" />
      <link rel="shortcut icon" href="/icon.svg" />
    </Head>
  );
};

export default Header;
