import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

const Loading = (): JSX.Element => {
  return (
    <Stack direction="column" height="100%" justifyContent="space-between">
      {[5, 6, 8, 10, 15, 19, 21, 32, 48, 50].map((margin) => (
        <Skeleton animation="wave" height="20px" key={margin} sx={{ marginRight: margin }} />
      ))}
    </Stack>
  )
}

export default Loading
