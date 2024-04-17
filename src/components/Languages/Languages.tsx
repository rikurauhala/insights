import { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart'

import octokitService from '~/services/octokit'
import { LanguageMap } from '~/types'
import colors from '~/utils/colors'

const Languages = (): JSX.Element => {
  const [languages, setLanguages] = useState<LanguageMap>({})
  const totalBytes = Object.values(languages).reduce((total, bytes) => total + bytes, 0)

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
    <PieChart
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
      width={400}
      height={200}
    />
  )
}

export default Languages
