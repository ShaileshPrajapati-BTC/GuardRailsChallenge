import React from 'react';
import DateTime from 'react-datetime';

const DateTimePicker = ({ onChange, error, touched }) =>
  <>
    <DateTime
      onChange={onChange}
      inputProps={{ placeholder: "Select date and time" }}
    />
    {touched && error && <div className="text-red">{error}</div>}
  </>

export default DateTimePicker;