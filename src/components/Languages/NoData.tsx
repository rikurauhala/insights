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
      <Typography paragraph>No repositories with programming languages found!</Typography>
      <Typography paragraph>Create a repository and write some code first.</Typography>
    </Box>
  )
}

export default NoData
