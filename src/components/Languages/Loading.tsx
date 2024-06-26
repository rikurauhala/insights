import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

interface LoadingProps {
  visible: boolean
}

const Loading = ({ visible }: LoadingProps): JSX.Element => {
  if (!visible) {
    return <></>
  }

  return (
    <Stack direction="column" height="100%" justifyContent="space-between">
      {[5, 6, 8, 10, 15, 19, 21, 32, 48, 50].map((margin) => (
        <Skeleton key={margin} animation="wave" height="20px" sx={{ marginRight: margin }} />
      ))}
    </Stack>
  )
}

export default Loading
