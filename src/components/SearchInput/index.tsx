import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';

import styles from './SearchInput.module.css'

interface SearchInputProps {
  placeholder: string;
  onFilter: (value: string) => void;
}

const BASE_DELAY = 500;

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onFilter,
}) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!touched) return;

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, BASE_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [value, touched])

  useEffect(() => {
    if (touched) {
      onFilter(debouncedValue)
    }
  }, [debouncedValue, touched]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTouched(true)
    setValue(event.target.value);
  }, [setTouched, setValue])

  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      data-testid="filter"
    />
  );
};