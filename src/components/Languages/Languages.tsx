import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { PieChart } from '@mui/x-charts/PieChart'

import octokitService from '~/services/octokit'
import { LanguageMap } from '~/types'
import colors from '~/utils/colors'

const Languages = (): JSX.Element => {
  const [languages, setLanguages] = useState<LanguageMap>({})

  useEffect(() => {
    void octokitService.getRepositories().then((repositoriesData) => {
      octokitService.getLanguages(repositoriesData).then((languagesData) => {
        setLanguages(languagesData)
      })
    })
  }, [])

  const data = Object.entries(languages).map(([language, bytes]) => ({
    id: language,
    value: bytes,
    label: language,
    color: colors[language as keyof typeof colors],
  }))

  return (
    <Paper sx={{ marginTop: '20px', padding: '30px' }}>
      <Typography variant="h5">Languages</Typography>
      <PieChart
        series={[
          {
            cornerRadius: 5,
            data: data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            innerRadius: 50,
            paddingAngle: 3,
          },
        ]}
        width={400}
        height={200}
      />
    </Paper>
  )
}

export default Languages
