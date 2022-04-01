import { useEffect, useState } from 'react'
import { Center, Grid, Group, Image, Table, Title, useMantineTheme } from '@mantine/core'
import { jsonUtils, PlayerProfileSettings } from '../utils/utils'

const Levels = () => {
  const theme = useMantineTheme()

  const [stats, setStats] = useState<PlayerProfileSettings>()
  const [latestStat, setLatestStat] = useState<PlayerProfileSettings>()
  const [diffStat, setDiffStat] = useState<PlayerProfileSettings>()

  useEffect(() => {
    if (stats === undefined) {
      console.log('FIRST STATS')
      setStats(latestStat)
    } else {
      if (stats && latestStat && PlayerProfileSettings.hasNewMissionCompleted(stats, latestStat)) {
        console.log('CHANGED')
        setDiffStat(PlayerProfileSettings.subtract(latestStat, stats))
      }
      if (stats && latestStat && (stats._stats.enemyDamageInflicted !== latestStat._stats.enemyDamageInflicted || stats._stats.timesIncappedAsCleaner !== latestStat._stats.timesIncappedAsCleaner || stats._stats.timesDiedAsCleaner !== latestStat._stats.timesDiedAsCleaner)) {
        console.log('SOMETHING CHANGED')
        console.log(stats._stats.enemyDamageInflicted, latestStat._stats.enemyDamageInflicted, stats._stats.timesIncappedAsCleaner, latestStat._stats.timesIncappedAsCleaner, stats._stats.timesDiedAsCleaner, latestStat._stats.timesDiedAsCleaner, stats._supplyPoints, latestStat._supplyPoints)
        setStats(latestStat)
      }
    }
  }, [latestStat])

  useEffect(() => {
    global.ipcRenderer.on('json', (_event, jsons: any) => {
      const playerStat = jsonUtils.jsonToPlayerStats(jsons.json)

      // TODO DEV
      const playerStat1 = jsonUtils.jsonToPlayerStats(jsons.json1)
      const playerStat2 = jsonUtils.jsonToPlayerStats(jsons.json2)
      // setDiffStat(PlayerProfileSettings.subtract(playerStat2, playerStat1))

      // TODO save level

      setLatestStat(playerStat)

      const diffPlayer = PlayerProfileSettings.subtract(playerStat2, playerStat1)

    })

    // TODO show levels
  }, [])

  return (
    <>
      <Center style={{ width: '100%', marginBottom: '3em' }}>
        <Title order={1}>Latest Completed Mission</Title>
      </Center>
      {diffStat !== undefined && <>
        <Center>
          <Group style={{ display: 'inline-flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Title order={3}
                   style={{
                     textAlign: 'center',
                     width: '100%'
                   }}>{diffStat._missions.latest.difficulty.text}</Title>
            <Image src={'images/difficulties/' + diffStat._missions.latest.difficulty.id + '.webp'} height={250}
                   fit={'contain'} width={'auto'}/>
          </Group>
          <Group style={{ display: 'inline-flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Title order={3}
                   style={{
                     width: '100%',
                     textAlign: 'center'
                   }}>{diffStat._missions.latest.cleaner.text}</Title>
            <Image src={'images/cleaners/' + diffStat._missions.latest.cleaner.id + '.webp'} height={285}
                   fit={'contain'} width={'auto'} style={{ marginTop: '-2em' }}/>
          </Group>
          <Group style={{ display: 'inline-flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Title order={3}
                   style={{
                     width: '100%',
                     textAlign: 'center'
                   }}>{diffStat._missions.latest.act.text} - {diffStat._missions.latest.mission.text}</Title>
            <Image src={'images/missions/' + diffStat._missions.latest.mission.id + '.webp'} height={250}
                   fit={'contain'} width={'auto'}/>
          </Group>
        </Center>
        <Grid gutter={'xl'}>
          <Grid.Col span={4}>
            <Title order={2} style={{ marginTop: '2em', marginBottom: '.5em' }}>Ridden kills</Title>
            <Table verticalSpacing={'sm'}>
              <tbody>
              <tr>
                <td>Boss killed</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.riddenBossesKilled}</td>
              </tr>
              <tr>
                <td>Snitcher silenced</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.snitchersSilenced}</td>
              </tr>
              <tr>
                <td>Special ridden killed</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.riddenMutationsKilled}</td>
              </tr>
              <tr>
                <td>Special ridden damage inflicted</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.specialRiddenDamageInflicted}</td>
              </tr>
              <tr>
                <td>Common ridden killed</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.riddenKilled}</td>
              </tr>
              <tr>
                <td>Common ridden damage inflicted</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.commonRiddenDamageInflicted}</td>
              </tr>
              <tr>
                <td>Weak spot damages</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.weakSpotDamageInflicted}</td>
              </tr>
              <tr>
                <td>Ridden killed while incapped</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.riddenKilledWhileIncapped}</td>
              </tr>
              <tr>
                <td>Damage inflicted</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.enemyDamageInflicted}</td>
              </tr>
              </tbody>
            </Table>
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={2} style={{ marginTop: '2em', marginBottom: '.5em' }}>Cleaner stats</Title>
            <Table verticalSpacing={'sm'}>
              <tbody>
              <tr>
                <td>Incapped</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.timesIncappedAsCleaner}</td>
              </tr>
              <tr>
                <td>Died</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.timesDiedAsCleaner}</td>
              </tr>
              <tr>
                <td>Friendly damage inflicted</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.friendlyDamageInflicted}</td>
              </tr>
              <tr>
                <td>Friendly cleaners killed</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.friendlyCleanersKilled}</td>
              </tr>
              <tr>
                <td>Cleaners revived</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.cleanersRevived}</td>
              </tr>
              <tr>
                <td>Cleaners rescued</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.cleanersRescued}</td>
              </tr>
              </tbody>
            </Table>
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={2} style={{ marginTop: '2em', marginBottom: '.5em' }}>Others</Title>
            <Table verticalSpacing={'sm'}>
              <tbody>
              <tr>
                <td>Supply points</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._supplyPoints}</td>
              </tr>
              <tr>
                <td>Ammo dropped</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.ammoDropped}</td>
              </tr>
              <tr>
                <td>Treasure door opened</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.treasureDoorsOpened}</td>
              </tr>
              <tr>
                <td>Hordes triggered</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.hordesTriggered}</td>
              </tr>
              <tr>
                <td>Cards played</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.cardsPlayed}</td>
              </tr>
              <tr>
                <td>Caravan items purchased</td>
                <td style={{ paddingLeft: '4em' }}>{diffStat._stats.caravanItemsPurchased}</td>
              </tr>
              </tbody>
            </Table>
          </Grid.Col>
        </Grid>
      </>}
    </>
  )
}

export default Levels
