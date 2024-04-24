import { useCallback, useEffect, useState } from 'react'
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

  const getSource = useCallback((): LanguageMap => {
    return source === 'repository' ? languagesByRepository : languagesByBytes
  }, [languagesByBytes, languagesByRepository, source])

  useEffect(() => {
    void dataService.getLanguagesByBytes().then((languagesData) => {
      setLanguagesByBytes(languagesData)
    })
    void dataService.getLanguagesByRepository().then((languagesData) => {
      setLanguagesByRepository(languagesData)
    })
  }, [])

  useEffect(() => {
    const transformData = (data: LanguageMap) => {
      const dataset = Object.entries(data).map(([, value]) => ({
        value: [value as number],
      }))
      setDataset(dataset)
    }

    transformData(getSource())
  }, [getSource])

  useEffect(() => {
    const formatTooltipText = (value: number | null): string => {
      if (value === null) {
        return ''
      }
      const units =
        source === 'repository' ? (value === 1 ? 'repository' : 'repositories') : 'bytes'
      const total = Object.values(getSource()).reduce((total, bytes) => total + bytes, 0)
      return formatPercentage(total, units, value)
    }

    const transformSeries = (data: LanguageMap) => {
      const languageKeys = Object.keys(data)
      const series = languageKeys.map((language) => ({
        color: getColor(language) as string,
        id: language,
        label: language,
        data: languageKeys.map((key) => (key === language ? data[language] : null)),
        valueFormatter: (value: number | null) => formatTooltipText(value),
      }))
      setSeries(series)
    }

    transformSeries(getSource())
  }, [getSource, source])

  if (
    Object.keys(languagesByBytes).length === 0 ||
    Object.keys(languagesByRepository).length === 0 ||
    dataset.length === 0 ||
    series.length === 0
  ) {
    return <div>Loading...</div>
  }

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
          grid={{ horizontal: true }}
          series={series}
          slotProps={{ legend: { hidden: true } }}
          xAxis={[{ data: Object.keys(getSource()), scaleType: 'band' }]}
          yAxis={[{}]}
        />
      </Paper>
    </>
  )
}

export default Languages
