import React from 'react';
import GenericTable from '../GenericTable';

function TopProducts() {
  return (
    <GenericTable
      title="Top Products"
      numberItemsPerPage={10}
      headers={[
        { name: 'No#', field: 'id', sortable: false },
        { name: 'Name', field: 'name', sortable: true },
        { name: 'Stock', field: 'email', sortable: true },
        { name: 'Campo Inútil', field: 'body', sortable: false },
      ]}
    />
  );
}

export default TopProducts;
