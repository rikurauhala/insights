import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import GitHubIcon from '@mui/icons-material/GitHub'
import PlaceIcon from '@mui/icons-material/Place'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

import dataService from '~/services/data'
import { GitHubUser } from '~/types'

import Loading from './Loading'
import ProfilePicture from './ProfilePicture'

const nullUser = {
  avatarUrl: null,
  location: null,
  name: null,
  profileUrl: null,
  registrationDate: null,
  username: null,
}

const Info = (): JSX.Element => {
  const [user, setUser] = useState<GitHubUser>(nullUser)

  useEffect(() => {
    void dataService.getUser().then((userData) => setUser(userData))
  }, [])

  const infoItems = [
    {
      key: 'username',
      title: 'Username',
      icon: <GitHubIcon />,
      value: user.username,
    },
    {
      key: 'registered',
      title: 'Registered',
      icon: <CalendarMonthIcon />,
      value: user.registrationDate,
    },
    {
      key: 'location',
      title: 'Location',
      icon: <PlaceIcon />,
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
      <Stack direction="column" justifyContent="space-between" spacing={1} textAlign="left">
        <Typography component="h2" variant="h5">
          {user.name ?? <Loading />}
        </Typography>
        {infoItems.map(({ key, title, icon, value }) => (
          <Stack key={key} alignItems="center" direction="row" spacing={1.5}>
            {icon}
            <Stack alignItems="start" direction="column">
              <Typography color="secondary" variant="body1">
                {title}
              </Typography>
              <Typography variant="body2">{value ? value : <Loading />}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default Info
