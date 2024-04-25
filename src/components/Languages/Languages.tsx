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
  const [series, setSeries] = useState<unknown[]>([])

  const getLabel = (): string => (source === 'repository' ? 'Repositories' : 'Total bytes')

  const getSource = useCallback((): LanguageMap => {
    return source === 'repository' ? languagesByRepository : languagesByBytes
  }, [languagesByBytes, languagesByRepository, source])

  const getUnits = useCallback(
    (value: number): string => {
      if (source === 'repository') {
        return value === 1 ? 'repository' : 'repositories'
      }
      return value === 1 ? 'byte' : 'bytes'
    },
    [source]
  )

  useEffect(() => {
    void dataService.getLanguagesByBytes().then((languagesData) => {
      setLanguagesByBytes(languagesData)
    })
    void dataService.getLanguagesByRepository().then((languagesData) => {
      setLanguagesByRepository(languagesData)
    })
  }, [])

  useEffect(() => {
    const formatTooltipText = (value: number): string => {
      const units = getUnits(value)
      const total = Object.values(getSource()).reduce((total, bytes) => total + bytes, 0)
      return formatPercentage(total, units, value)
    }

    const transformSeries = (data: LanguageMap) => {
      const languages = Object.keys(data)
      const series = languages.map((language) => ({
        color: getColor(language) as string,
        data: languages.map((key) => (key === language ? data[language] : null)),
        highlightScope: {
          faded: 'global',
          highlighted: 'item',
        },
        id: language,
        label: language,
        stack: 'total',
        valueFormatter: (value: number | null) => value && formatTooltipText(value),
      }))
      setSeries(series)
    }

    transformSeries(getSource())
  }, [getSource, getUnits, source])

  if (
    Object.keys(languagesByBytes).length === 0 ||
    Object.keys(languagesByRepository).length === 0 ||
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
          grid={{ vertical: true }}
          layout="horizontal"
          margin={{ left: 90 }}
          series={series}
          slotProps={{ legend: { hidden: true } }}
          xAxis={[{ label: getLabel() }]}
          yAxis={[
            {
              data: Object.keys(getSource()),
              hideTooltip: true,
              scaleType: 'band',
            },
          ]}
        />
      </Paper>
    </>
  )
}

export default Languages
