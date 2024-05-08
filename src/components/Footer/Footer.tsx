import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import HyperLink from '~/components/HyperLink'

const Footer = (): JSX.Element => {
  const authorUrl = 'https://github.com/rikurauhala'
  const sourceUrl = `${authorUrl}/insights`
  const licenseUrl = `${sourceUrl}/blob/main/LICENSE.md`

  const items = [
    { key: 'author', text: 'Author', url: authorUrl },
    { key: 'source', text: 'Source code', url: sourceUrl },
    { key: 'license', text: 'License', url: licenseUrl },
  ]

  return (
    <Paper sx={{ margin: '20px 0px', padding: '20px 0px' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-evenly"
        spacing={{ xs: 1, md: 2 }}
        textAlign="center"
      >
        {items.map(({ key, text, url }) => (
          <HyperLink key={key} href={url} text={text} />
        ))}
      </Stack>
    </Paper>
  )
}

export default Footer
