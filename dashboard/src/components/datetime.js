import React from 'react';
import DateTime from 'react-datetime';

const DateTimePicker = ({ onChange, onBlur, error, touched }) =>
  <>
    <DateTime
      onChange={onChange}
      onBlur={onBlur}
      inputProps={{ placeholder: "Select date and time" }}
    />
    {touched && error && <div className="text-red">{error}</div>}
  </>

export default DateTimePicker;