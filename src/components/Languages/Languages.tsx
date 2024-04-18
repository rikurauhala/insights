import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { PieChart } from '@mui/x-charts/PieChart'

import dataService from '~/services/data'
import { LanguageMap } from '~/types'
import colors from '~/utils/colors'

const Languages = (): JSX.Element => {
  const [languagesByBytes, setLanguagesByBytes] = useState<LanguageMap>({})
  const [languagesByRepository, setLanguagesByRepository] = useState<LanguageMap>({})
  const [source, setSource] = useState<string>('repository')
  const totalBytes = Object.values(languagesByBytes).reduce((total, bytes) => total + bytes, 0)

  useEffect(() => {
    void dataService.getLanguagesByBytes().then((languagesData) => {
      setLanguagesByBytes(languagesData)
    })
    void dataService.getLanguagesByRepository().then((languagesData) => {
      setLanguagesByRepository(languagesData)
    })
  }, [])

  const languagesByBytesData = Object.entries(languagesByBytes).map(([language, bytes]) => ({
    id: language,
    value: bytes,
    label: language,
    color: colors[language as keyof typeof colors],
  }))

  const languagesByRepositoryData = Object.entries(languagesByRepository).map(
    ([language, instances]) => ({
      id: language,
      value: instances,
      label: language,
      color: colors[language as keyof typeof colors],
    })
  )

  return (
    <>
      <FormControl>
        <RadioGroup onChange={(event) => setSource(event.target.value)} row value={source}>
          <FormControlLabel value="repository" control={<Radio />} label="Repository" />
          <FormControlLabel value="totalBytes" control={<Radio />} label="Total bytes" />
        </RadioGroup>
      </FormControl>
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
              data: source === 'repository' ? languagesByRepositoryData : languagesByBytesData,
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
    </>
  )
}

export default Languages
