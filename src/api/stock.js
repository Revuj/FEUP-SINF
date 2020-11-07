const fetchYearStocks = (year) => {
  // No futuro fazer request à primavera API
  return [100, 123, 123, 320, 190, 250, 245, 230, 250, 320, 621];
};

const fetchWarehousesStocks = () => {
  return [12, 19, 3, 5, 2, 3];
};

export { fetchYearStocks, fetchWarehousesStocks };
