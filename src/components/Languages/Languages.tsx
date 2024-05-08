import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { BarSeriesType } from '@mui/x-charts'
import { BarChart } from '@mui/x-charts/BarChart'
import { useCallback, useEffect, useState } from 'react'

import dataService from '~/services/data'
import { LanguageMap } from '~/types'
import { formatPercentage, getColor } from '~/utils'

import Loading from './Loading'

enum Source {
  REPO = 'repo',
  SIZE = 'size',
}

const Languages = (): JSX.Element => {
  const [languagesByRepo, setLanguagesByRepo] = useState<LanguageMap>({})
  const [languagesBySize, setLanguagesBySize] = useState<LanguageMap>({})
  const [source, setSource] = useState<Source>(Source.REPO)
  const [series, setSeries] = useState<BarSeriesType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getSource = useCallback((): LanguageMap => {
    return source === Source.REPO ? languagesByRepo : languagesBySize
  }, [languagesByRepo, languagesBySize, source])

  useEffect(() => {
    void dataService.getLanguagesByRepo().then((languages) => {
      setLanguagesByRepo(languages)
    })
    void dataService.getLanguagesBySize().then((languages) => {
      setLanguagesBySize(languages)
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    const formatBytes = (total: number, bytes: number): string => {
      const megaBytes = 1024 * 1024
      return `${(bytes / megaBytes).toFixed(2)} MB (${((bytes / total) * 100).toFixed(2)}%)`
    }

    const formatTooltipText = (value: number): string => {
      const total = Object.values(getSource()).reduce((total, items) => total + items, 0)
      if (source === Source.REPO) {
        const units = value === 1 ? 'repository' : 'repositories'
        return formatPercentage(total, units, value)
      }
      return formatBytes(total, value)
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
  }, [getSource, source])

  const getLabel = (): string => {
    return source === Source.REPO ? ' \nRepositories' : ' \nTotal size (megabytes)'
  }

  const formatAxisValue = (value: string): string => {
    if (source === Source.REPO) {
      return value.toString()
    }
    const megaBytes = 1024 * 1024
    return `${(parseInt(value, 10) / megaBytes).toFixed(2)}`
  }

  return (
    <>
      <FormControl>
        <RadioGroup
          onChange={(event) => setSource(event.target.value as Source)}
          row
          value={source}
        >
          <FormControlLabel
            control={<Radio />}
            disabled={loading}
            label="Repository"
            value={Source.REPO}
          />
          <FormControlLabel
            control={<Radio />}
            disabled={loading}
            label="Total size"
            value={Source.SIZE}
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
            margin={{ bottom: 80, left: 90 }}
            series={series}
            slotProps={{ legend: { hidden: true } }}
            xAxis={[
              {
                label: getLabel(),
                valueFormatter: (value) => formatAxisValue(value),
              },
            ]}
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
