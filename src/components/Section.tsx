import InfoIcon from '@mui/icons-material/InfoOutlined'
import Chip from '@mui/material/Chip'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'

interface SectionProps {
  description?: string
  fetching?: boolean
  icon?: React.ReactNode
  info?: React.ReactNode | string
  children: React.ReactNode
  title?: string
}

/**
 * A wrapper component for all sections on the page.
 *
 * @param {React.ReactNode} children - The content of the section.
 * @param {string} [description] - A brief description of the section. Displayed under the title.
 * @param {boolean} [fetching] - Indicates if data is still being fetched.
 * @param {React.ReactNode} [icon] - An icon to display next to the title.
 * @param {React.ReactNode | string} [info] - More detailed information about the section or its controls.
 * @param {string} [title] - The title of the section.
 * @returns {JSX.Element} A new Section component.
 */
const Section = ({
  children,
  description,
  fetching,
  icon,
  info,
  title,
}: SectionProps): JSX.Element => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)
  const [chipVisible, setChipVisible] = useState<boolean>(true)

  useEffect(() => {
    if (fetching === undefined) {
      setChipVisible(false)
      return
    }

    if (fetching === false) {
      const timer = setTimeout(() => {
        setChipVisible(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [fetching])

  return (
    <Paper sx={{ marginTop: '20px', padding: '30px' }}>
      {title && (
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Stack alignItems="center" direction="row" gap={1}>
            {icon}
            <Typography component="h2" variant="h6">
              {title}
            </Typography>
          </Stack>
          <Stack alignItems="center" direction="row" gap={1}>
            {chipVisible && (
              <Chip
                color={fetching ? 'warning' : 'success'}
                label={fetching ? 'Fetching data' : 'Data fetched!'}
                variant="outlined"
              />
            )}
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
