import Typography from '@mui/material/Typography'

interface NameProps {
  name: string
}

const Name = ({ name }: NameProps): JSX.Element => (
  <Typography component="h1" variant="h4">
    {name}
  </Typography>
)

export default Name
