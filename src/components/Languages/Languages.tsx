import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { PieChart } from '@mui/x-charts/PieChart'

import dataService from '~/services/data'
import { LanguageMap } from '~/types'
import { getColor } from '~/utils'

const Languages = (): JSX.Element => {
  const [languagesByBytes, setLanguagesByBytes] = useState<LanguageMap>({})
  const [languagesByRepository, setLanguagesByRepository] = useState<LanguageMap>({})
  const [source, setSource] = useState<string>('repository')

  useEffect(() => {
    void dataService.getLanguagesByBytes().then((languagesData) => {
      setLanguagesByBytes(languagesData)
    })
    void dataService.getLanguagesByRepository().then((languagesData) => {
      setLanguagesByRepository(languagesData)
    })
  }, [])

  const formatTooltipText = (value: number): string => {
    const units = source === 'repository' ? (value === 1 ? 'repository' : 'repositories') : 'bytes'
    const total = Object.values(
      source === 'repository' ? languagesByRepository : languagesByBytes
    ).reduce((total, bytes) => total + bytes, 0)
    return `${value.toLocaleString()} ${units} (${((value / total) * 100).toFixed(2)}%)`
  }

  const data = Object.entries(
    source === 'repository' ? languagesByRepository : languagesByBytes
  ).map(([language, units]) => ({
    id: language,
    value: units,
    label: language,
    color: getColor(language),
  }))

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
              data: data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              innerRadius: 50,
              paddingAngle: 3,
              valueFormatter: (language) => formatTooltipText(language.value),
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
