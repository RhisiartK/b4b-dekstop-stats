import { useEffect, useState } from 'react'
import { Dropzone, DropzoneStatus } from '@mantine/dropzone'
import { Icon as TablerIcon, Photo, Upload, X } from 'tabler-icons-react'
import { Code, Divider, Group, Kbd, MantineTheme, Text, useMantineTheme } from '@mantine/core'

function getIconColor (status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
      ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7]
}

function ImageUploadIcon ({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />
  }

  if (status.rejected) {
    return <X {...props} />
  }

  return <Photo {...props} />
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80}/>

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
)

const IndexPage = () => {
  const theme = useMantineTheme()

  const [damageInflected, setDamageInflected] = useState<Array<number>>([])
  const [latestDamageInflected, setLatestDamageInflected] = useState<number | null>(null)

  useEffect(() => {
    if (latestDamageInflected !== null) {
      if (damageInflected.length === 0) {
        setDamageInflected([latestDamageInflected])
        console.log('BASE DAMAGE INFLECTED', latestDamageInflected)
      } else if (damageInflected[damageInflected.length - 1] < latestDamageInflected) {
        setDamageInflected([...damageInflected, latestDamageInflected])
        console.log('CHANGED DAMAGE INFLECTED', latestDamageInflected)
        console.log('LATEST DAMAGE INFLECTED', latestDamageInflected - damageInflected[damageInflected.length - 1])
      }
    }
  }, [latestDamageInflected])

  const acceptedFile = (files) => {
    console.log(files[0].path)
    const jsonPath = files[0].path

    global.ipcRenderer.send('path', jsonPath)
    global.ipcRenderer.on('json', (_event, json: any) => {
      console.log('READ')
      setLatestDamageInflected(json.offlineData.stats.enemyDamageInflicted.base)
    })
  }

  useEffect(() => {
    // add a listener to 'message' channel
    global.ipcRenderer.addListener('message', (_event, args) => {
      alert(args)
    })
  }, [])

  const onSayHiClick = () => {
    global.ipcRenderer.send('message', 'hi from next')
  }

  return (
    <div>
      <p>To display your statistics, you need to extract them, please follow instructions below.</p>

      <div className="my-6">
        <div className="flex">
          <img src="/images/steam.svg" alt="Steam" className="h-8 w-8"/>
          <h3 className="text-3xl ml-2">Steam</h3>
        </div>

        If you play the game through Steam, you should find your statistics file at path:
        <br/>
        <Code><b>{'<disk>:\\Users\\<username>\\AppData\\Local\\Back4Blood\\Steam\\Saved\\SaveGames\\PlayerProfileSettings.json'}</b></Code>
      </div>

      <Divider variant="dashed"/>

      <div className="my-6">
        <div className="flex">
          <img src="/images/xbox.svg" alt="Xbox Game Pass" className="h-8 w-8"/>
          <h3 className="text-3xl ml-2">Xbox Game Pass</h3>
        </div>

        If you play the game through Xbox Game Pass, you should find your statistics file somewhere in:
        <br/>
        <Kbd
          className="color-primary color-bg-secondary"><b>{'<disk>:\\Users\\<username>\\AppData\\Local\\Packages\\WarnerBros.Interactive.<some key>\\SystemAppData\\wgs\\'}</b></Kbd>
        <br/>
        Please note that Xbox Game Pass stores your files differently (within sub folders), so you'll have to try
        several files until you have it displayed.
      </div>

      <Divider variant="dashed"/>

      <div className="my-6">
        <div className="flex">
          <img src="/images/epic_games.svg" alt="Epic Games" className="h-8 w-8"/>
          <h3 className="text-3xl ml-2">Epic Games Store</h3>
        </div>

        If you play the game through Epic Games Store, you should find your statistics file at:
        <br/>
        <Kbd
          className="color-primary color-bg-secondary"><b>{'<disk>:\\Users\\<username>\\AppData\\Local\\Back4Blood\\Epic\\Saved\\SaveGames\\PlayerProfileSettings.json'}</b></Kbd>
      </div>

      <Divider variant="dashed"/>

      <div className="text-sm mt-6">
        <p>
          Please note that Windows hide some folders by default (AppData being one of them), if you can't see it, show
          hidden folders in your Windows settings.
        </p>
      </div>

      <Dropzone
        onDrop={acceptedFile}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
    </div>
  )
}

export default IndexPage
