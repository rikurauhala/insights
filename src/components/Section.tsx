import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Fade from '@mui/material/Fade'
import Grow from '@mui/material/Grow'
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
    if (fetching === false || fetching === undefined) {
      setChipVisible(false)
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
            <Fade appear={false} in={chipVisible} timeout={5000}>
              <Chip
                color={fetching ? 'warning' : 'success'}
                icon={
                  <Box alignItems="center" display="flex" paddingRight="5px">
                    {fetching ? (
                      <CircularProgress color="inherit" size={15} />
                    ) : (
                      <Grow in={!fetching} timeout={1000}>
                        <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
                      </Grow>
                    )}
                  </Box>
                }
                label={fetching ? 'Fetching data' : 'Data fetched!'}
                size="small"
                sx={{ padding: '15px 10px' }}
                variant="outlined"
              />
            </Fade>
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
