import ReactWordcloud from '@cyberblast/react-wordcloud'

import { getColor } from '~/utils'

interface TopicsWordCloud {
  shown: number
  topics: Record<string, number>
  visible: boolean
}

const TopicsWordCloud = ({ shown, topics, visible }: TopicsWordCloud): JSX.Element => {
  if (!visible) {
    return <></>
  }

  return (
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
  )
}

export default TopicsWordCloud
