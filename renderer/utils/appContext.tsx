import React from 'react'

interface IAppContext {
  loading: boolean;
  pathExists: boolean
  statsFilePath: string | undefined
  setLoading?: (loading: boolean) => void;
  setPathExists?: (pathExists: boolean) => void;
  setStatsFilePath?: (statsFilePath: string | undefined) => void;
}

const defaultContextState = {
  loading: false,
  pathExists: false,
  statsFilePath: undefined
}

export const AppContext = React.createContext<IAppContext>(defaultContextState)

