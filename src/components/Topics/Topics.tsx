import { useEffect, useState } from 'react'
import ReactWordcloud from '@cyberblast/react-wordcloud'
import Paper from '@mui/material/Paper'

import dataService from '~/services/data'
import { TopicMap } from '~/types'

const Topics = (): JSX.Element => {
  const [topics, setTopics] = useState<TopicMap>({})

  const words = Object.entries(topics)
    .map(([topic, count]) => ({ text: topic, value: count }))
    .slice(0, 50)

  useEffect(() => {
    void dataService.getTopics().then((topicData) => {
      setTopics(topicData)
    })
  }, [])

  return (
    <Paper elevation={3} sx={{ margin: '20px 0px', padding: '20px' }}>
      <ReactWordcloud
        callbacks={{
          getWordTooltip: (word) => `${word.text} (${word.value})`,
        }}
        options={{
          fontSizes: [20, 100],
          rotations: 2,
          rotationAngles: [-90, 0],
          padding: 5,
        }}
        words={words}
      />
    </Paper>
  )
}

export default Topics
