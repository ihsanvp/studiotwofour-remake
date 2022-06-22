import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import Loader from "components/Loader/Loader";

import s1 from "assets/images/slide-4.jpg";
import s2 from "assets/images/slide-5.jpg";
import s3 from "assets/images/slide-6.jpg";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Loader imageUrls={[s1.src, s2.src, s3.src]}>
        <Component {...pageProps} />
      </Loader>
    </Fragment>
  );
}

export default MyApp;
