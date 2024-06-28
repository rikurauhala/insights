import CodeIcon from '@mui/icons-material/Code'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import { BarSeriesType } from '@mui/x-charts'
import { useCallback, useEffect, useState } from 'react'

import OptionSelector from '~/components/OptionSelector'
import Section from '~/components/Section'
import dataService from '~/services/data'
import { LanguageMap } from '~/types'
import { formatPercentage, getColor } from '~/utils'

import LanguagesChart from './LanguagesChart'
import Loading from './Loading'
import NoData from './NoData'

enum Source {
  REPO = 'repo',
  SIZE = 'size',
}

const Languages = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true)
  const [languagesByRepo, setLanguagesByRepo] = useState<LanguageMap>({})
  const [languagesBySize, setLanguagesBySize] = useState<LanguageMap>({})
  const [noData, setNoData] = useState<boolean>(true)
  const [source, setSource] = useState<Source>(Source.REPO)
  const [series, setSeries] = useState<BarSeriesType[]>([])

  const getSource = useCallback((): LanguageMap => {
    return source === Source.REPO ? languagesByRepo : languagesBySize
  }, [languagesByRepo, languagesBySize, source])

  useEffect(() => {
    void dataService.getLanguagesByRepo().then((languages) => {
      setLanguagesByRepo(languages)
      setNoData(Object.keys(languages).length === 0)
    })
    void dataService.getLanguagesBySize().then((languages) => {
      setLanguagesBySize(languages)
      setNoData(Object.keys(languages).length === 0)
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

  const handleSourceChange = (newSource: string) => {
    setSource(newSource as Source)
  }

  return (
    <Section
      description="Top programming languages"
      icon={<CodeIcon />}
      info={
        <span>
          <b>Repository</b> displays the share of each language used as the main (majority) language
          of a repository.
          <br />
          <br />
          <b>Total size</b> shows the proportion of each language used across all repositories by
          the total number of megabytes.
          <br />
          <br />
          Hover over the chart to see the exact number and share of each item.
        </span>
      }
      title="Languages"
    >
      <Box>
        <OptionSelector
          disabled={loading || noData}
          onChange={handleSourceChange}
          options={[
            { label: 'Repository', value: Source.REPO },
            { label: 'Total size', value: Source.SIZE },
          ]}
          value={source}
        />
        <Paper
          elevation={3}
          sx={{ height: '400px', margin: '20px 0px', padding: loading ? '30px' : 0 }}
        >
          <Loading visible={loading} />
          <NoData visible={!loading && noData} />
          <LanguagesChart
            data={Object.keys(getSource())}
            formatAxisValue={formatAxisValue}
            label={getLabel()}
            series={series}
            visible={!loading && !noData}
          />
        </Paper>
      </Box>
    </Section>
  )
}

export default Languages
