import React from 'react';
import GenericTable from '../GenericTable';

function BestClients() {
  return (
    <GenericTable
      title="Best Clients"
      numberItemsPerPage={5}
      headers={[
        { name: 'No#', field: 'id', sortable: false },
        { name: 'Name', field: 'name', sortable: true },
        { name: 'Stock', field: 'email', sortable: true },
      ]}
    />
  );
}

export default BestClients;
