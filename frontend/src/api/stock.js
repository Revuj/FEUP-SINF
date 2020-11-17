const fetchYearStocks = (year) => {
  // No futuro fazer request à primavera API
  return [100, 123, 123, 320, 190, 250, 245, 230, 250, 320, 621];
};

const fetchWarehousesStocks = () => {
  return [12, 19, 3, 5, 2, 3];
};

const fetchWarehousesInfo = () => {
  return [
    {
        "id": 1,
        "name": "Alpha",
        "location": "Aveiro",
        "stock": 48367
    },
    {
        "id": 2,
        "name": "Beeta",
        "location": "Porto",
        "stock": 45776
    },
    {
        "id": 3,
        "name": "Gama",
        "location": "Vila Real",
        "stock": 71441
    },
    {
        "id": 4,
        "name": "Delta",
        "location": "Braga",
        "stock": 38217
    },
    {
        "id": 5,
        "name": "Epsilon",
        "location": "Lisboa",
        "stock": 79232
    },
    {
        "id": 6,
        "name": "Zeta",
        "location": "Algarve",
        "stock": 57699
    },
  ];
}

export { fetchYearStocks, fetchWarehousesStocks, fetchWarehousesInfo };
