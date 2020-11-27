import axios from "axios";

const baseUrl = "/api/financial";

const fetchProfitLoss = () => {
  return axios.get(`${baseUrl}/profit-loss`, {});
};

export { fetchProfitLoss };
