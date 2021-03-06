import { useEffect, useState } from 'react'
import { Center, Image, Title, useMantineTheme } from '@mantine/core'
import { jsonUtils, PlayerProfileSettings } from '../utils/utils'

const Progressions = () => {
  const theme = useMantineTheme()

  const [stats, setStats] = useState<PlayerProfileSettings>()

  useEffect(() => {
    global.ipcRenderer.on('json', (_event, jsons: any) => {
      const playerStat = jsonUtils.jsonToPlayerStats(jsons.json)
      setStats(playerStat)
    })
  }, [])

  return (
    <>
      <Center style={{ width: '100%', marginBottom: '1em' }}>
        <Title order={1}>Progressions</Title>
      </Center>
      <Image src={'./images/difficulties/hard.webp'} height={250} fit={'contain'} width={'auto'}/>
    </>
  )
}

export default Progressions
