import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import octokitService from '~/services/octokit'
import { LanguageMap } from '~/types'

const Languages = (): JSX.Element => {
  const [languages, setLanguages] = useState<LanguageMap>({})

  useEffect(() => {
    void octokitService.getRepositories().then((repositoriesData) => {
      octokitService.getLanguages(repositoriesData).then((languagesData) => {
        setLanguages(languagesData)
      })
    })
  }, [])

  return (
    <Paper sx={{ marginTop: '20px', padding: '30px' }}>
      <Typography variant="h5">Languages</Typography>
      <ul>
        {Object.entries(languages).map(([language, bytes]) => (
          <li key={language}>
            <Typography>
              {language}: {bytes} bytes
            </Typography>
          </li>
        ))}
      </ul>
    </Paper>
  )
}

export default Languages
