import React from 'react'

interface IAppContext {
  loading: boolean;
  setLoading?: (loading: boolean) => void;
}

const defaultContextState = {
  loading: false,
}

export const AppContext = React.createContext<IAppContext>(defaultContextState)

