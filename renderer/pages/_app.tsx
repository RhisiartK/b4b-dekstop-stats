import { AppProps } from 'next/app'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import './../styles/globals.scss'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { AppContext } from '../utils/appContext'

export default function _app (props: AppProps) {
  const { Component, pageProps } = props

  const [loadingStatsAutomatically, setLoadingStatsAutomatically] = useState(true)
  const [statsFileFound, setStatsFileFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // After component loaded, we try to load the stats file automatically for better UX
    global.ipcRenderer.send('loadStatsFile')
    // If stats file loaded we redirect the user to the player stats page
    global.ipcRenderer.on('loadStatsFileSuccess', () => {
      setLoadingStatsAutomatically(false)
      setStatsFileFound(true)
      router.push('/player')
    })
    global.ipcRenderer.on('loadStatsFileError', () => {
      setLoadingStatsAutomatically(false)
      setStatsFileFound(false)
    })
  }, [])

  return (
    <AppContext.Provider value={{ loading: loading, setLoading: (loadingState) => setLoading(loadingState) }}>
      <Head>
        <title>Back 4 Blood - Realtime Stats</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Head>
      <Layout statsFileFound={statsFileFound} loadingStatsAutomatically={loadingStatsAutomatically}>
        <Component {...pageProps} statsFileFound={statsFileFound}
                   loadingStatsAutomatically={loadingStatsAutomatically}/>
      </Layout>
    </AppContext.Provider>
  )
}
