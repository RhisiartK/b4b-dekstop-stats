import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import {
  AppShell,
  Burger,
  Container,
  Group,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core'
import { Home, InfoCircle, User } from 'tabler-icons-react'

type Props = {
  children: ReactNode
  title?: string
}

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string
}

function MainLink ({ icon, color, label, href }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Link href={href}>
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>


          <Text size="sm">{label}</Text>
        </Group>
      </Link>

    </UnstyledButton>
  )
}

const Layout = ({ children }: Props) => {
  const data = [
    { icon: <Home size={16}/>, color: 'blue', label: 'Home', href: '/' },
    { icon: <User size={16}/>, color: 'blue', label: 'Player stats', href: '/player' },
    { icon: <InfoCircle size={16}/>, color: 'grape', label: 'About', href: '/about' },
  ]

  const links = data.map((link) => <MainLink {...link} key={link.label}/>)
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
      <AppShell
        // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
        navbarOffsetBreakpoint="sm"
        // fixed prop on AppShell will be automatically added to Header and Navbar
        fixed
        header={<Header height={60}>
          <Container fluid style={{ height: '60px', alignItems: 'center', display: 'flex' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Title order={1} style={{ display: 'inline-block' }}>B4B - Realtime Stats</Title>
          </Container>
        </Header>}
        navbar={<Navbar p="md"
          // Breakpoint at which navbar will be hidden if hidden prop is true
                        hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
                        hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
                        width={{ sm: 200, lg: 300 }}>
          <Navbar.Section>
            {links}
          </Navbar.Section>
        </Navbar>}
      >
        {children}
      </AppShell>
    </MantineProvider>
  )
}

export default Layout
