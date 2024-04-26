import { useCallback, useEffect, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { BarSeriesType } from '@mui/x-charts'
import { BarChart } from '@mui/x-charts/BarChart'

import dataService from '~/services/data'
import { LanguageMap } from '~/types'
import { formatPercentage, getColor } from '~/utils'

import Loading from './Loading'

const Languages = (): JSX.Element => {
  const [languagesByBytes, setLanguagesByBytes] = useState<LanguageMap>({})
  const [languagesByRepository, setLanguagesByRepository] = useState<LanguageMap>({})
  const [source, setSource] = useState<string>('repository')
  const [series, setSeries] = useState<BarSeriesType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getLabel = (): string => (source === 'repository' ? 'Repositories' : 'Total bytes')

  const getSource = useCallback((): LanguageMap => {
    return source === 'repository' ? languagesByRepository : languagesByBytes
  }, [languagesByBytes, languagesByRepository, source])

  const getUnits = useCallback(
    (value: number): string => {
      switch (source) {
        case 'repository':
          return value === 1 ? 'repository' : 'repositories'
        case 'totalBytes':
          return value === 1 ? 'byte' : 'bytes'
        default:
          return ''
      }
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
      setSeries(series as BarSeriesType[])
    }

    transformSeries(getSource())
  }, [getSource, getUnits, source])

  useEffect(() => {
    if (Object.keys(languagesByBytes).length && Object.keys(languagesByRepository).length) {
      setLoading(false)
    }
  }, [languagesByBytes, languagesByRepository])

  return (
    <>
      <FormControl>
        <RadioGroup onChange={(event) => setSource(event.target.value)} row value={source}>
          <FormControlLabel
            control={<Radio />}
            disabled={loading}
            label="Repository"
            value="repository"
          />
          <FormControlLabel
            control={<Radio />}
            disabled={loading}
            label="Total bytes"
            value="totalBytes"
          />
        </RadioGroup>
      </FormControl>
      <Paper
        elevation={3}
        sx={{ height: '400px', margin: '20px 0px', padding: loading ? '30px' : 0 }}
      >
        {loading ? (
          <Loading />
        ) : (
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
        )}
      </Paper>
    </>
  )
}

export default Languages
