import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import GitHubIcon from '@mui/icons-material/GitHub'
import PlaceIcon from '@mui/icons-material/Place'

import dataService from '~/services/data'
import { GitHubUser } from '~/types'

import ProfilePicture from './ProfilePicture'

const Info = (): JSX.Element => {
  const [user, setUser] = useState<GitHubUser | null>(null)

  useEffect(() => {
    void dataService.getUser().then((userData) => setUser(userData))
  }, [])

  if (!user) {
    return <Box>Loading...</Box>
  }

  const infoItems = [
    {
      key: 'Username',
      icon: <GitHubIcon fontSize="small" />,
      value: (
        <Link href={user.profileUrl} rel="noopener" target="_blank">
          {user.username}
        </Link>
      ),
    },
    {
      key: 'Registered',
      icon: <CalendarMonthIcon fontSize="small" />,
      value: user.registrationDate,
    },
    {
      key: 'Location',
      icon: <PlaceIcon fontSize="small" />,
      value: user.location,
    },
  ]

  return (
    <Stack
      alignItems="center"
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="center"
      spacing={4}
    >
      <ProfilePicture url={user.avatarUrl} />
      <Stack direction="column" height="150px" justifyContent="space-between" textAlign="left">
        <Typography variant="h5">{user.name}</Typography>
        {infoItems.map(({ key, icon, value }) => (
          <Stack alignItems="center" direction="row" key={key} spacing={1}>
            {icon}
            <Typography>{value}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default Info
