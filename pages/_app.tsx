import type { AppProps } from "next/app";
import Head from "next/head";
import { HelmetProvider } from "react-helmet-async";

import "styles/globals.scss";
import styles from "styles/components/layout.module.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <HelmetProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>pITcasso</title>
      </Head>

      <div className={styles["app"]}>
        <Component {...pageProps} />
      </div>
    </HelmetProvider>
  );
};

export default App;
