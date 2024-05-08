import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

const Loading = (): JSX.Element => {
  return (
    <Grid container height="100%" spacing={2}>
      {Array.from({ length: 36 }, (_, index) => (
        <Grid item key={index} xs={3}>
          <Skeleton animation="wave" height="20px" />
        </Grid>
      ))}
    </Grid>
  )
}

export default Loading
