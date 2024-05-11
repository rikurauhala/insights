import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface NoDataProps {
  visible: boolean
}

const NoData = ({ visible }: NoDataProps): JSX.Element => {
  if (!visible) {
    return <></>
  }

  return (
    <Box alignContent="center" height="400px" textAlign="center">
      <Typography paragraph>No commits found!</Typography>
    </Box>
  )
}

export default NoData
