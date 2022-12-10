import type { AppProps } from "next/app";
import Head from "next/head";
import { HelmetProvider } from "react-helmet-async";

import { ContextProvider } from "context";

import "styles/global.scss";
import styles from "styles/components/layout.module.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ContextProvider>
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
    </ContextProvider>
  );
};

export default App;
