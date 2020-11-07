import React from 'react';
import GenericTable from '../GenericTable';

function TopProducts() {
  return (
    <GenericTable
      title="Top Products"
      numberItemsPerPage={13}
      headers={[
        { name: 'No#', field: 'id', sortable: false },
        { name: 'Name', field: 'name', sortable: true },
        { name: 'Stock', field: 'email', sortable: true },
      ]}
    />
  );
}

export default TopProducts;
