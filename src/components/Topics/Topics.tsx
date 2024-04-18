import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'

import dataService from '~/services/data'
import { TopicMap } from '~/types'

const Topics = (): JSX.Element => {
  const [topics, setTopics] = useState<TopicMap>({})

  useEffect(() => {
    void dataService.getTopics().then((topicData) => {
      setTopics(topicData)
    })
  }, [])

  return (
    <Paper
      elevation={3}
      sx={{
        margin: '20px 0px',
        padding: '20px 0px',
        width: '100%',
      }}
    >
      {Object.keys(topics).map((topic) => (
        <div key={topic}>{topic}</div>
      ))}
    </Paper>
  )
}

export default Topics
