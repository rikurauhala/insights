import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

const Loading = (): JSX.Element => {
  return (
    <Grid container spacing={2} height="100%">
      {Array.from({ length: 36 }, (_, index) => (
        <Grid item key={index} xs={3}>
          <Skeleton animation="wave" height="20px" />
        </Grid>
      ))}
    </Grid>
  )
}

export default Loading
