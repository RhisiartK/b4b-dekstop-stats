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
  const [loading, setLoading] = useState(false)
  const [pathExists, setPathExists] = useState(false)
  const [statsFilePath, setStatsFilePath] = useState<string>()
  const router = useRouter()

  useEffect(() => {
    // After component loaded, we try to load the stats file automatically for better UX
    global.ipcRenderer.send('watchStats')
    setLoading(true)
    // If stats file loaded we redirect the user to the player stats page
    global.ipcRenderer.on('watchStatsSuccess', (_event, data: { path: string }) => {
      setLoadingStatsAutomatically(false)
      setPathExists(true)
      setStatsFilePath(data.path)
      setLoading(false)
    })
    global.ipcRenderer.on('watchStatsError', () => {
      setLoadingStatsAutomatically(false)
      setPathExists(false)
      setStatsFilePath(undefined)
      setLoading(false)
    })
    global.ipcRenderer.on('resetConfigSuccess', () => {
      setPathExists(false)
      setStatsFilePath(undefined)
    })
  }, [])

  return (
    <AppContext.Provider value={{
      loading: loading,
      pathExists: pathExists,
      statsFilePath: statsFilePath,
      setLoading: (loadingState) => setLoading(loadingState),
      setStatsFilePath: (statsFilePathState) => setStatsFilePath(statsFilePathState),
      setPathExists: (pathExistsState) => setPathExists(pathExistsState)
    }}>
      <Head>
        <title>Back 4 Blood - Desktop Stats</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <base href="./"/>
      </Head>
      <Layout loadingStatsAutomatically={loadingStatsAutomatically}>
        <Component {...pageProps} loadingStatsAutomatically={loadingStatsAutomatically}/>
      </Layout>
    </AppContext.Provider>
  )
}
