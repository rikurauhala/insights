import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

interface LoadingProps {
  visible: boolean
}

const SkeletonComponent = (): JSX.Element => {
  return (
    <Skeleton
      animation="wave"
      height={Math.floor(Math.random() * 250) + 50}
      sx={{ marginRight: 1 }}
      width="50%"
    />
  )
}

const Loading = ({ visible }: LoadingProps): JSX.Element => {
  if (!visible) {
    return <></>
  }

  return (
    <Stack
      alignItems="center"
      direction="row"
      height="100%"
      justifyContent="space-between"
      width="100%"
    >
      {[...Array(3)].map((_, index) => (
        <Stack key={index} alignItems="flex-end" direction="row" flexGrow={1}>
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
        </Stack>
      ))}
    </Stack>
  )
}

export default Loading
