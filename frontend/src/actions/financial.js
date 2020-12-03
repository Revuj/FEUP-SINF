import axios from "axios";

const baseUrl = "/api/financial";

const accountsIds = {
  sales: 71,
  costs: 61,
};

const fetchProfitLoss = () => {
  return axios.get(`${baseUrl}/profit-loss`, {});
};

const fetchSales = (monthly) => {
  return axios.get(
    `${baseUrl}/account-balance?accountId=${accountsIds.sales}&monthly=${monthly}`
  );
};

const fetchCosts = () => {
  return axios.get(
    `${baseUrl}/account-balance?accountId=${accountsIds.costs}&monthly=true`
  );
};

export { fetchProfitLoss, fetchSales, fetchCosts };
