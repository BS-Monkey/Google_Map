import React from 'react';
import { Input, CustomInput } from 'reactstrap';

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render('Filter')}
    </div>
  );
};

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`search (${length}) ...`}
      className="px-2 py-1 rounded"
    />
  );
};

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id }
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return Object.values(options);
  }, [id, preFilteredRows]);

  return (
    <CustomInput
      id={id}
      type='select'
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
  
    >
      <option value=''>All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </CustomInput>
  );
};
