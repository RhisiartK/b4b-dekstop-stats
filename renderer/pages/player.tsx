import { useEffect } from 'react'
import { useMantineTheme } from '@mantine/core'

const Player = () => {
  const theme = useMantineTheme()

  useEffect(() => {
    global.ipcRenderer.send('getPlayerStat',)
  }, [])

  return (
    <div>
      <p>Player stat</p>
    </div>
  )
}

export default Player
