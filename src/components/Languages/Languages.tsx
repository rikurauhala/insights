import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { PieChart } from '@mui/x-charts/PieChart'

import dataService from '~/services/data'
import { LanguageMap } from '~/types'
import colors from '~/utils/colors'

const Languages = (): JSX.Element => {
  const [languages, setLanguages] = useState<LanguageMap>({})
  const totalBytes = Object.values(languages).reduce((total, bytes) => total + bytes, 0)

  useEffect(() => {
    void dataService.getLanguagesByRepository().then((languagesData) => {
      setLanguages(languagesData)
    })
  }, [])

  const data = Object.entries(languages).map(([language, bytes]) => ({
    id: language,
    value: bytes,
    label: language,
    color: colors[language as keyof typeof colors],
  }))

  return (
    <Paper
      elevation={3}
      sx={{
        height: '390px',
        margin: '20px 0px',
        padding: '20px 0px',
        width: '100%',
      }}
    >
      <PieChart
        margin={{ top: 100, bottom: 0, left: 0, right: 0 }}
        series={[
          {
            cornerRadius: 5,
            data: data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            innerRadius: 50,
            paddingAngle: 3,
            valueFormatter: (language) => `${((language.value / totalBytes) * 100).toFixed(2)}%`,
          },
        ]}
        slotProps={{
          legend: {
            direction: 'row',
            itemGap: 10,
            markGap: 8,
            position: {
              horizontal: 'middle',
              vertical: 'top',
            },
          },
        }}
      />
    </Paper>
  )
}

export default Languages
