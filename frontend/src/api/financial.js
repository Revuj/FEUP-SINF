import axios from "axios";

const baseUrl = "/api/financial";

const accountsIds = {
  sales: 71,
  costs: 61,
};

const fetchProfitLoss = () => {
  return axios.get(`${baseUrl}/profit-loss`, {});
};

const fetchSalesAndCosts = () => {
  const sales = axios.get(
    `${baseUrl}/account-balance?accountId=${accountsIds.sales}&monthly=true`
  );

  const costs = axios.get(
    `${baseUrl}/account-balance?accountId=${accountsIds.costs}&monthly=true`
  );

  return { sales, costs };
};

export { fetchProfitLoss, fetchSalesAndCosts };
