import axios from "axios";

const baseUrl = "/api/financial";

const accountsIds = {
  sales: 71,
  costs: 61,
};

const fetchProfitLoss = () => {
  return axios.get(`${baseUrl}/profit-loss`, {});
};

const fetchSales = () => {
  return axios.get(
    `${baseUrl}/account-balance?accountId=${accountsIds.sales}&monthly=true`
  );
};

const fetchCosts = () => {
  return axios.get(
    `${baseUrl}/account-balance?accountId=${accountsIds.costs}&monthly=true`
  );
};

export { fetchProfitLoss, fetchSales, fetchCosts };
