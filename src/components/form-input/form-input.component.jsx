import React from 'react';

// import './form-input.styles.scss';

const FormInput = ({ onChange, label, name, ...otherProps }) => (
  <div className="form-group">
    {label ? <label htmlFor={name + 'Input'}>{label}</label> : null}
    <input
      className="form-control"
      id={name + 'Input'}
      name={name}
      onChange={onChange}
      {...otherProps}
    />
  </div>
);

export default FormInput;
