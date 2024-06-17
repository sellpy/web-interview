import { TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

export function DebouncedTextField({
  debounceTime,
  label,
  onChange,
  value,
}) {
  const [textValue, setTextValue] = useState(value);
  const stableOnChangeRef = useRef(onChange);
  const debouncedTextValue = useDebounce(textValue, debounceTime);

  useEffect(() => {
    stableOnChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    stableOnChangeRef.current(debouncedTextValue);
  }, [debouncedTextValue]);

  return (
    <TextField
      sx={{ flexGrow: 1, marginTop: '1rem' }}
      label={label}
      aria-label={label}
      value={textValue}
      onChange={(event) => {
        setTextValue(event.target.value);
      }} />
  );
}
