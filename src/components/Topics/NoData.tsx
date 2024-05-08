import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import HyperLink from '~/components/HyperLink'

interface NoDataProps {
  visible: boolean
}

const NoData = ({ visible }: NoDataProps): JSX.Element => {
  if (!visible) {
    return <></>
  }

  return (
    <Box alignContent="center" height="300px" textAlign="center">
      <Typography>
        No{' '}
        <HyperLink
          href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics"
          text="topics"
        />{' '}
        found! Consider adding some.
      </Typography>
    </Box>
  )
}

export default NoData
