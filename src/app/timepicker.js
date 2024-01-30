import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomTimePicker = ({ selectedTime, onChange }) => {
  const [hours, setHours] = useState(selectedTime ? selectedTime.getHours() : 0);
  const [minutes, setMinutes] = useState(selectedTime ? selectedTime.getMinutes() : 0);

  const handleHoursChange = (e) => {
    const newHours = parseInt(e.target.value, 10);
    setHours(newHours);
    onChange(new Date(selectedTime.setHours(newHours, minutes)));
  };

  const handleMinutesChange = (e) => {
    const newMinutes = parseInt(e.target.value, 10);
    setMinutes(newMinutes);
    onChange(new Date(selectedTime.setMinutes(newMinutes)));
  };

  return (
    <div>
      <label htmlFor="hours">Hours:</label>
      <input
        type="number"
        id="hours"
        value={hours}
        onChange={handleHoursChange}
        min={0}
        max={23}
      />

      <label htmlFor="minutes">Minutes:</label>
      <input
        type="number"
        id="minutes"
        value={minutes}
        onChange={handleMinutesChange}
        min={0}
        max={59}
      />
    </div>
  );
};

CustomTimePicker.propTypes = {
  selectedTime: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
};

export default CustomTimePicker;
