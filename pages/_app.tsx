import React from 'react'
import NextHead from 'next/head'
import { wrapper } from '../src/store/store'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import { GoogleAnalytics } from 'nextjs-google-analytics'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Layout from 'components/Layout'
config.autoAddCss = false

const Starkboard = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={wrapper}>
      <NextHead>
        <title>Starkboard | Find all the latest Starknet data that you are looking for</title>
        <link rel="icon" href="favicon.ico" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,300&display=swap" rel="stylesheet" />
      </NextHead>
        <GoogleAnalytics trackPageViews />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default Starkboard
