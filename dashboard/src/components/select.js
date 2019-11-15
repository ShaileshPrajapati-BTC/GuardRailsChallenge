import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ value, touched, error, onChange, options, onMenuClose, placeholder }) =>
  <>
    <Select
      value={value}
      onChange={onChange}
      options={options}
      onMenuClose={onMenuClose}
    />
    {touched && error && <div className="text-red">{error}</div>}
  </>

export default CustomSelect;