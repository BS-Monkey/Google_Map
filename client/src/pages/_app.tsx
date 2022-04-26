import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../components/Map/theme';
import createEmotionCache from '../components/Map/createEmotionCache';
import '../assets/main.css';
import '../assets/chrome-bug.css';
import { createGlobalStyle } from 'styled-components';
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import '@fortawesome/fontawesome-free/css/all.css';

// ...



import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

import '../App.css';

const GlobalStyle = createGlobalStyle`
html{
  overflow-y: hidden;
}
 body {
   text-rendering: optimizeLegibility;
   -webkit-font-smoothing: antialiased;
   -webkit-tap-highlight-color: transparent;
   -moz-osx-font-smoothing: grayscale;
   overflow-x: hidden;
   width: 100%;
   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    overflow-y: auto !important;
  max-height: 100vh;
  background-color: #f4f7fa;
 }

 h1 {
  font-size: 40px;
  font-weight: 500;
  letter-spacing: 0.05rem;
  padding: 0px 0px 20px 0px;
}
 h3 {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.05rem;
}
h4 {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.03rem;
  padding-bottom: 10px;
}
h5{
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 0.03rem;
  padding: 20px 0px 10px 0px;
}
h6{
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.03rem;
  padding: 20px 20px 10px 20px;
}
h7 {
  font-size: 23px;
  font-weight: 400;
  letter-spacing: 0.05rem;
}
p {
  
  font-size: 15px;
  font-weight: 300;
  padding: 10px 0px 5px 0px;
  line-height: 30px;
  letter-spacing: 0.03rem;
}

.fa-xs {
  padding-right: 5px;
}
`;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
    <ToastContainer 
    position="top-center"
    transition={Slide}
   
    autoClose={4000}
hideProgressBar={true}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover />
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </CacheProvider>
    </>
  );
}
