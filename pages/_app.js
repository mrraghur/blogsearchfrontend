import Script from "next/script";
// import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../utils/theme";
// import store from "../store/index";
import createEmotionCache from "../utils/createEmotion";

import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    // <Provider store={store}>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
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
        <Script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></Script>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
    // </Provider>
  );
}

export default MyApp;
