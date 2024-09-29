import React, { useState } from 'react';

const Slider = (props) => {

  const [value, setValue] = useState(props.value || 0)
  const label = props.label || ""
  const units = props.units || ""
  const min = props.min || 0
  const max = props.max || 100
  const width = props.width || "150px"
  const fontSize = props.fontSize || "12px"
  const disabled = props.disabled || false

  const handleSliderChange = (event) => {
    setValue(event.target.value);
    props.updateParent(event.target.value)
  };

  return (
    <div>
     <div style={{fontSize: fontSize }}>
        {label}: {value} {units}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
        style={{ width: width }}
        disabled ={disabled}
      />
    </div>
  );
};

export default Slider;

