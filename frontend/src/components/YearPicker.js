import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const YearPicker = ({ year, setYear }) => {
  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title={year}>
        <Dropdown.Item href="#/action-1" onClick={() => setYear(2020)}>
          2020
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={() => setYear(2019)}>
          2019
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={() => setYear(2018)}>
          2018
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};
