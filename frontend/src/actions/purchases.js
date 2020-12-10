import axios from "axios";

const fetchYearPurchases = (year) => {
  // No futuro fazer request à primavera API
  return [30, 50, 45, 60, 160, 90, 95, 95, 100, 400, 370];
};

const fetchDebt = () => {
  return axios.get(`/api/purchases/debt-suppliers`);
};

export { fetchYearPurchases, fetchDebt };
