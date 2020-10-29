import React from 'react';
import GenericTable from '../GenericTable';

function BestClients() {
  return (
    <GenericTable
      title="Best Clients"
      numberItemsPerPage={4}
      headers={[
        { name: 'No#', field: 'id', sortable: false },
        { name: 'Name', field: 'name', sortable: true },
        { name: 'Stock', field: 'email', sortable: true },
        { name: 'Campo Inútil', field: 'body', sortable: false },
      ]}
    />
  );
}

export default BestClients;
