import ReactWordcloud from '@cyberblast/react-wordcloud'
import Paper from '@mui/material/Paper'
import Slider from '@mui/material/Slider'
import { useEffect, useState } from 'react'

import dataService from '~/services/data'
import { TopicMap } from '~/types'
import { getColor } from '~/utils'

import Loading from './Loading'
import NoData from './NoData'

const Topics = (): JSX.Element => {
  const [topics, setTopics] = useState<TopicMap>({})
  const [shown, setShown] = useState<number>(20)
  const [loading, setLoading] = useState<boolean>(true)
  const [noData, setNoData] = useState<boolean>(false)

  useEffect(() => {
    void dataService.getTopics().then((topicData) => {
      setTopics(topicData)
      setLoading(false)
      setNoData(Object.keys(topicData).length === 0)
    })
  }, [])

  return (
    <>
      <Slider
        disabled={loading || noData}
        marks={Array.from({ length: 5 }, (_, i) => ({
          value: (i + 1) * 10,
          label: ((i + 1) * 10).toString(),
        }))}
        max={50}
        min={5}
        onChange={(_event, value) => value && setShown(value as number)}
        step={5}
        value={shown}
        valueLabelDisplay="auto"
      />
      <Paper elevation={3} sx={{ margin: '20px 0px', padding: '20px' }}>
        {loading && <Loading />}
        {noData && <NoData />}
        {!loading && !noData && (
          <ReactWordcloud
            callbacks={{
              getWordColor: (word) => getColor(word.text),
              getWordTooltip: (word) => `${word.text} (${word.value})`,
            }}
            options={{
              fontSizes: [20, 100],
              rotations: 2,
              rotationAngles: [-90, 0],
              padding: 5,
            }}
            words={Object.entries(topics)
              .map(([topic, count]) => ({ text: topic, value: count }))
              .slice(0, shown)}
          />
        )}
      </Paper>
    </>
  )
}

export default Topics
