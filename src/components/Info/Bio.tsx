import Typography from '@mui/material/Typography'

interface BioProps {
  bio: string
}

const Bio = ({ bio }: BioProps): JSX.Element => (
  <Typography color="primary" component="h2" margin="15px 0px" variant="subtitle1">
    {bio}
  </Typography>
)

export default Bio
