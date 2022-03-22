import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import './../styles/globals.scss'
import Layout from '../components/Layout'

export default function _app (props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Back 4 Blood - Realtime Stats</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
