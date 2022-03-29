import { useEffect } from 'react'
import { Center, Title, useMantineTheme } from '@mantine/core'
import { jsonUtils } from '../utils/utils'

const Player = () => {
  const theme = useMantineTheme()

  useEffect(() => {
    global.ipcRenderer.on('json', (_event, jsons: any) => {
      jsonUtils.jsonChanges(jsons.json1, jsons.json2)
    })
  }, [])

  return (
    <>
      <Center style={{ width: '100%', marginBottom: '1em' }}>
        <Title order={1}>Player stats</Title>
      </Center>
    </>
  )
}

export default Player
