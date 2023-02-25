import { Field } from 'formik';
import React from 'react';

const RadioButton = ({
  items,
}: {
  items: { value: string; label: string }[];
}) => {
  return (
    <fieldset
      className="cds--radio-button-group cds--radio-button-group--label-right"
      role="group"
      aria-labelledby="my-radio-group"
    >
      {items?.map((item, index) => (
        <label className="cds--radio-button-wrapper" key={index}>
          <Field
            className="cds--radio-button"
            type={'radio'}
            name="authenticationType"
            value={item?.value}
          />
          <p className="cds--radio-button__label">
            <span className="cds--radio-button__appearance"></span>
            <span className="cds--radio-button__label-text" dir="auto">
              {item?.label}
            </span>
          </p>
        </label>
      ))}
    </fieldset>
  );
};

export default RadioButton;
