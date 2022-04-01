import React from 'react'
import { Center, List, Title } from '@mantine/core'

const IndexPage: React.FC<{ loadingStatsAutomatically: boolean }> = () => {

  return (<>
    <Center style={{ width: '100%', marginBottom: '1em' }}>
      <Title order={1}>Home</Title>
    </Center>
    <Title order={2} style={{ marginBottom: '.5em' }}>Version updates</Title>
    <Title order={3} style={{ marginBottom: '.5em' }}>v0.1.0</Title>
    <List withPadding>
      <List.Item>Save and load configuration, that contains the stats file's path</List.Item>
      <List.Item>Show the latest completed level's stats</List.Item>
    </List>
    <Title order={2} style={{ marginBottom: '.5em' }}>Upcoming features</Title>
    <List withPadding>
      <List.Item>Tracking ZWAT progreesion</List.Item>
      <List.Item>Tracking Recruit, Veteran and Cleaner achievements in all Act</List.Item>
    </List>
  </>)
}

export default IndexPage
