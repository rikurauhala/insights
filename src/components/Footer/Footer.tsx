import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const Footer = (): JSX.Element => {
  const authorUrl = 'https://github.com/rikurauhala'
  const sourceUrl = `${authorUrl}/insights`
  const licenseUrl = `${sourceUrl}/blob/main/LICENSE.md`

  const items = [
    { text: 'Author', url: authorUrl },
    { text: 'Source code', url: sourceUrl },
    { text: 'License', url: licenseUrl },
  ]

  return (
    <Paper sx={{ margin: '20px 0px', padding: '20px 0px' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-evenly"
        spacing={{ xs: 1, md: 2 }}
        textAlign="center"
      >
        {items.map(({ text, url }) => (
          <Link key={text} href={url} rel="noopener" target="_blank">
            <Typography variant="body2">{text}</Typography>
          </Link>
        ))}
      </Stack>
    </Paper>
  )
}

export default Footer
