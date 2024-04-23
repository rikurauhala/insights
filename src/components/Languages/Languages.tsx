import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { BarChart } from '@mui/x-charts/BarChart'

import dataService from '~/services/data'
import { LanguageMap } from '~/types'
import { formatPercentage, getColor } from '~/utils'

const Languages = (): JSX.Element => {
  const [languagesByBytes, setLanguagesByBytes] = useState<LanguageMap>({})
  const [languagesByRepository, setLanguagesByRepository] = useState<LanguageMap>({})
  const [source, setSource] = useState<string>('repository')
  const [dataset, setDataset] = useState<unknown[]>([])
  const [series, setSeries] = useState<unknown[]>([])

  useEffect(() => {
    void dataService.getLanguagesByBytes().then((languagesData) => {
      setLanguagesByBytes(languagesData)
    })
    void dataService.getLanguagesByRepository().then((languagesData) => {
      setLanguagesByRepository(languagesData)
    })
  }, [])

  useEffect(() => {
    const formatTooltipText = (value: number | null): string => {
      if (value === null) {
        return ''
      }
      const units =
        source === 'repository' ? (value === 1 ? 'repository' : 'repositories') : 'bytes'
      const total = Object.values(
        source === 'repository' ? languagesByRepository : languagesByBytes
      ).reduce((total, bytes) => total + bytes, 0)
      return formatPercentage(total, units, value)
    }

    const transformData = (data: LanguageMap) => {
      const dataset = Object.entries(data).map(([, value]) => ({
        value: [value as number],
      }))
      setDataset(dataset)
      const series = Object.entries(data).map(([language, value]) => ({
        color: getColor(language) as string,
        label: language as string,
        data: [value as number],
        valueFormatter: (value: number | null) => formatTooltipText(value),
      }))
      setSeries(series)
    }

    transformData(source === 'repository' ? languagesByRepository : languagesByBytes)
  }, [dataset, languagesByBytes, languagesByRepository, source])

  return (
    <>
      <FormControl>
        <RadioGroup onChange={(event) => setSource(event.target.value)} row value={source}>
          <FormControlLabel value="repository" control={<Radio />} label="Repository" />
          <FormControlLabel value="totalBytes" control={<Radio />} label="Total bytes" />
        </RadioGroup>
      </FormControl>
      <Paper elevation={3} sx={{ height: '400px', margin: '20px 0px' }}>
        <BarChart
          dataset={dataset}
          grid={{ horizontal: true }}
          series={series}
          slotProps={{ legend: { hidden: true } }}
          xAxis={[{ scaleType: 'band', data: ['Language'] }]}
          yAxis={[{}]}
        />
      </Paper>
    </>
  )
}

export default Languages
