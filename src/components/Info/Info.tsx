import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import octokitService from '@/services/octokit'
import { UserFull } from '@/types'

import ProfilePicture from './ProfilePicture'
import Name from './Name'
import Bio from './Bio'

const Info = (): JSX.Element => {
  const [user, setUser] = useState<UserFull | null>(null)

  useEffect(() => {
    void octokitService.getUser(setUser)
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ marginTop: '10px', textAlign: 'center' }}>
      <Paper sx={{ paddingBottom: '30px' }}>
        <ProfilePicture url={user.avatar_url} />
        <Name name={user.name} />
        <Bio bio={user.bio} />
      </Paper>
    </Box>
  )
}

export default Info
