import type { AppProps } from "next/app";
import Head from "next/head";
import { HelmetProvider } from "react-helmet-async";

import "styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <HelmetProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1"
        />
        <title>pITcasso</title>
      </Head>
      <Component {...pageProps} />
    </HelmetProvider>
  );
};

export default App;
