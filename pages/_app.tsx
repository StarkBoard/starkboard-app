import React from 'react'
import NextHead from 'next/head'
import { wrapper } from '../src/store/store'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Layout from 'components/Layout'
import Script from 'next/script'
config.autoAddCss = false

const Starkboard = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={wrapper}>
      <NextHead>
        <title>Starkboard | Find all the latest Starknet data that you are looking for</title>
        <link rel="icon" href="favicon.ico" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,300&display=swap" rel="stylesheet" />

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-68DNMJFBK4"></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-68DNMJFBK4');
        `}
        </Script>
      </NextHead>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default Starkboard
