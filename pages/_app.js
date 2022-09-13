import React from "react";
import Head from "next/head";
import Script from "next/script";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../utils/theme";
import createEmotionCache from "../utils/createEmotion";

import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Blog-Search</title>
        </Head>
        <Script
          id="one"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
        />
        <Script id="two" strategy="lazyOnload">
          {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
             `}
        </Script>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
