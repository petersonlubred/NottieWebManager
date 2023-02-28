import { Field } from 'formik';
import React from 'react';

const Checkbox = ({ label, name, isMultiple, value }: { name: string; label: string; isMultiple?: boolean; value?: string }) => {
  const props = { label, name, value };
  if (isMultiple) {
    delete props.value;
  }
  return (
    <>
      <label
        className=""
        style={{
          width: 'fit-content',
          display: 'block',
          position: 'relative',
        }}
      >
        <Field type="checkbox" {...props} className="cds--checkbox" />
        <p className="cds--checkbox-label" title="">
          <span className="cds--checkbox-label-text">{label}</span>
        </p>
      </label>
    </>
  );
};

export default Checkbox;
