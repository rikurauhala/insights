import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

interface LoadingProps {
  visible: boolean
}

const Loading = ({ visible }: LoadingProps): JSX.Element => {
  if (!visible) {
    return <></>
  }

  return (
    <Grid container height="100%" spacing={2}>
      {Array.from({ length: 36 }, (_, index) => (
        <Grid key={index} item xs={3}>
          <Skeleton animation="wave" height="20px" />
        </Grid>
      ))}
    </Grid>
  )
}

export default Loading
