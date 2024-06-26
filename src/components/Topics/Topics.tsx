import TopicIcon from '@mui/icons-material/Topic'
import Paper from '@mui/material/Paper'
import Slider from '@mui/material/Slider'
import { useEffect, useState } from 'react'

import Section from '~/components/Section'
import dataService from '~/services/data'
import { TopicMap } from '~/types'

import Loading from './Loading'
import NoData from './NoData'
import TopicsWordCloud from './TopicsWordCloud'

const Topics = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true)
  const [topics, setTopics] = useState<TopicMap>({})
  const [noData, setNoData] = useState<boolean>(true)
  const [shown, setShown] = useState<number>(20)

  useEffect(() => {
    void dataService.getTopics().then((topicData) => {
      setTopics(topicData)
      setLoading(false)
      setNoData(Object.keys(topicData).length === 0)
    })
  }, [])

  return (
    <Section
      description="Top repository topics"
      icon={<TopicIcon />}
      info="Use the slider to control the number of topics shown."
      title="Topics"
    >
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
        <Loading visible={loading} />
        <NoData visible={!loading && noData} />
        <TopicsWordCloud shown={shown} topics={topics} visible={!loading && !noData} />
      </Paper>
    </Section>
  )
}

export default Topics
