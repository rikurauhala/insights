import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface NoDataProps {
  units: string
  visible: boolean
}

const NoData = ({ units, visible }: NoDataProps): JSX.Element => {
  if (!visible) {
    return <></>
  }

  return (
    <Box alignContent="center" height="300px" textAlign="center">
      <Typography paragraph>No {units} found!</Typography>
    </Box>
  )
}

export default NoData
