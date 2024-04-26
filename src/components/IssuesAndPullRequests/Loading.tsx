import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

const Loading = (): JSX.Element => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Skeleton height={200} variant="circular" width={200} />
    </Box>
  )
}

export default Loading
