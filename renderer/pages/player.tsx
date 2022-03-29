import { useEffect } from 'react'
import { useMantineTheme } from '@mantine/core'
import { jsonUtils } from '../utils/utils'

const Player = () => {
  const theme = useMantineTheme()

  useEffect(() => {
    global.ipcRenderer.on('json', (_event, jsons: any) => {
      jsonUtils.jsonChanges(jsons.json1, jsons.json2)
    })
  }, [])

  return (
    <div>
      <p>Player stat</p>
    </div>
  )
}

export default Player
