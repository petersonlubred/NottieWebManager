import React from 'react';

const Checkbox = ({
  onChange,
  label,
  value,
}: {
  onChange: any;
  label: string;
  value?: boolean;
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
        <input
          type="checkbox"
          checked={value}
          defaultChecked={value}
          onChange={onChange}
          className="cds--checkbox"
        />
        <p className="cds--checkbox-label" title="">
          <span className="cds--checkbox-label-text">{label}</span>
        </p>
      </label>
    </>
  );
};

export default Checkbox;
