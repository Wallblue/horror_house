import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SelectInputProps<T>{
  label: string;
  value: T;
  onChange: (e: any) => void;
  selectOptions: any[];
  optionValues?: any[];
}

export default function SelectInput<T>({label, value, onChange, selectOptions, optionValues} : SelectInputProps<T>) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        value={value}
        label={label}
        onChange={onChange}
        fullWidth
      >
        {selectOptions.map((option, i) => {
          const value = optionValues && optionValues[i] ? optionValues[i] : option;
          return (
          <MenuItem key={i} value={value}>{option}</MenuItem>
        )})}
      </Select>
    </FormControl>
  );
}