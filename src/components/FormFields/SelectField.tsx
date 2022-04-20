import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOptions {
  label?: string
  value: number | string
}

export interface SelectFieldProps {
    name: string;
    control: Control<any>
    label?: string
    disabled?: boolean
    options: SelectOptions[]
}

export function SelectField({name,control,label,disabled,options}: SelectFieldProps) {
  const {
    field:{value,onChange,onBlur},
    fieldState:{invalid,error}
  } = useController({
    name,
    control
  })
  return (
    <FormControl disabled={disabled} fullWidth  size="small" margin='normal' error={invalid}>
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map(option => (
          <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
  </FormControl>
  )
}