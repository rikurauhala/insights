import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

interface Option {
  label: string
  value: string
}

interface OptionSelectorProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  disabled: boolean
}

/**
 * A component for selecting an option from a list of possible values.
 *
 * @param {boolean} disabled - Indicates if the selector is disabled.
 * @param {(value: string) => void} onChange - The function to call when an option is selected.
 * @param {Option[]} options - The list of options to choose from.
 * @param {string} value - The currently selected option.
 * @returns {JSX.Element} A new OptionSelector component.
 */
const OptionSelector = ({
  disabled,
  onChange,
  options,
  value,
}: OptionSelectorProps): JSX.Element => {
  return (
    <Box>
      <FormControl>
        <RadioGroup onChange={(event) => onChange(event.target.value)} row value={value}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              control={<Radio />}
              disabled={disabled}
              label={option.label}
              value={option.value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default OptionSelector
