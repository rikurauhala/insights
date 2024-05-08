import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const NoData = (): JSX.Element => {
  return (
    <Box height="300px" alignContent="center" textAlign="center">
      <Typography>
        No{' '}
        <Link href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics">
          topics
        </Link>{' '}
        found! Consider adding some.
      </Typography>
    </Box>
  )
}

export default NoData
