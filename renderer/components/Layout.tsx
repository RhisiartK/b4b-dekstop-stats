import React, { ReactNode, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  AppShell,
  Burger,
  Container,
  Group,
  Header,
  LoadingOverlay,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core'
import { Home, InfoCircle, Settings, User } from 'tabler-icons-react'
import { AppContext } from '../utils/appContext'
import { useRouter } from 'next/router'

type Props = {
  children: ReactNode
  title?: string
  loadingStatsAutomatically: boolean
}

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string
  current?: boolean
}

function MainLink ({ icon, color, label, href, current }: MainLinkProps) {
  return (
    <Link href={href}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          backgroundColor:
            current ? theme.colors.dark[4] : 'transparent',
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? (current ? theme.colors.dark[4] : theme.colors.dark[6]) : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>
          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  )
}

const Layout = ({ children }: Props) => {
  const router = useRouter()
  const { loading, pathExists } = useContext(AppContext)

  const [links, setLinks] = useState([])

  let data = []

  useEffect(() => {
    if (pathExists) {
      data.push(
        {
          icon: <Home size={16}/>,
          color: 'blue',
          label: 'Home',
          href: '/',
          current: router.pathname === '/'
        },
        {
          icon: <User size={16}/>,
          color: 'blue',
          label: 'Player stats',
          href: '/player',
          current: router.pathname === '/player'
        },
        {
          icon: <Settings size={16}/>,
          color: 'blue',
          label: 'Settings',
          href: '/settings',
          current: router.pathname === '/settings'
        },
        {
          icon: <InfoCircle size={16}/>,
          color: 'grape',
          label: 'About',
          href: '/about',
          current: router.pathname === '/about'
        },
      )
    } else {
      data.push(
        {
          icon: <Home size={16}/>,
          color: 'blue',
          label: 'Home',
          href: '/',
          current: router.pathname === '/'
        },
        {
          icon: <Settings size={16}/>,
          color: 'blue',
          label: 'Settings',
          href: '/settings',
          current: router.pathname === '/settings'
        },
        {
          icon: <InfoCircle size={16}/>,
          color: 'grape',
          label: 'About',
          href: '/about',
          current: router.pathname === '/about'
        }
      )
    }
    setLinks(data.map((link) => <MainLink {...link} key={link.label}/>))
  }, [pathExists, router.pathname])

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
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} transitionDuration={500}/>
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
              <Title order={1} style={{ display: 'inline-block' }}>B4B - Desktop Stats - v0.1.0</Title>
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
      </div>
    </MantineProvider>
  )
}

export default Layout
