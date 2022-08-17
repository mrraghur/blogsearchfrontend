import React from "react";
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
        <Script
          id="one"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-JS6LSDJLS0`}
        />
        <Script id="two" strategy="lazyOnload">
          {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
           
             gtag('config', 'G-JS6LSDJLS0');
             `}
        </Script>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
