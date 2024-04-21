import { useState } from 'react'

import ClickAwayListener from '@mui/material/ClickAwayListener'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import InfoIcon from '@mui/icons-material/InfoOutlined'

interface SectionProps {
  description?: string
  icon?: React.ReactNode
  info?: React.ReactNode | string
  children: React.ReactNode
  title?: string
}

/**
 * A wrapper component for all sections on the page.
 *
 * @param {string} [description] - A brief description of the section. Displayed under the title.
 * @param {React.ReactNode} [icon] - An icon to display next to the title.
 * @param {React.ReactNode | string} [info] - More detailed information about the section or
 * its controls, displayed as a tooltip on the info icon. Can contain HTML elements.
 * @param {React.ReactNode} children - The content of the section.
 * @param {string} [title] - The title of the section.
 * @returns {JSX.Element} A new Section component.
 */
const Section = ({ description, icon, info, children, title }: SectionProps): JSX.Element => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

  return (
    <Paper sx={{ marginTop: '20px', padding: '30px' }}>
      {title && (
        <Stack alignItems="center" justifyContent="space-between" direction="row">
          <Stack alignItems="center" direction="row" gap={1.1}>
            {icon}
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
          </Stack>
          <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
            <Tooltip
              arrow
              disableFocusListener
              disableHoverListener
              disableTouchListener
              open={tooltipOpen}
              title={info}
            >
              <IconButton
                color={tooltipOpen ? 'primary' : 'secondary'}
                onClick={() => setTooltipOpen(true)}
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
        </Stack>
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
