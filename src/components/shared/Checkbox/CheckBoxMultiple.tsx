import { Field } from 'formik';
import React from 'react';

const CheckboxMultiple = ({
  name,
  label,
  value,
  checked,
}: {
  name: string;
  label: string;
  value?: string;
  checked?: boolean;
}) => {
  return (
    <>
      <label
        className=""
        style={{
          width: 'fit-content',
          display: 'block',
        }}
      >
        <Field
          className="cds--checkbox"
          type={'checkbox'}
          name={name}
          value={value}
        />
        <p className="cds--checkbox-label" title="">
          <span className="cds--checkbox-label-text">{label}</span>
        </p>
      </label>
    </>
  );
};

export default CheckboxMultiple;
