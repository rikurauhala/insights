import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

interface SectionProps {
  description?: string
  children: React.ReactNode
  title?: string
}

const Section = ({ description, children, title }: SectionProps): JSX.Element => {
  return (
    <Paper sx={{ marginTop: '20px', padding: '30px' }}>
      {title && (
        <Typography component="h2" variant="h5">
          {title}
        </Typography>
      )}
      {description && (
        <Typography component="p" margin="10px 0px" variant="body2">
          {description}
        </Typography>
      )}
      {children}
    </Paper>
  )
}

export default Section
