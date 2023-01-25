const initialData = {
  truckStatus: [
    'Loading at Warehouse',
    'Outbound for deliveries',
    'Returning to warehouse',
    'Maintenance'
  ],
  truckByStatus: {
  'Loading at Warehouse' : {trucks: []},
  'Outbound for deliveries' : {trucks: []},
  'Returning to warehouse': {trucks: []},
  'Maintenance': {trucks: []}
}
}

export default initialData;
