import axios from "axios";

const fetchSuppliers = () => {
  return [
    {
      rank: 6,
      id: 1,
      name: "Phyllis P. Fry",
      email: "PhyllisPFry@rhyta.com",
      value_purchases: 48367,
    },
    {
      rank: 7,
      id: 2,
      name: "Brian P. Gossett",
      email: "BrianPGossett@dayrep.com",
      value_purchases: 45776,
    },
    {
      rank: 2,
      id: 3,
      name: "Mike S. Garcia",
      email: "MikeSGarcia@jourrapide.com",
      value_purchases: 71441,
    },
    {
      rank: 8,
      id: 4,
      name: "Richard A. Burton",
      email: "RichardABurton@rhyta.com",
      value_purchases: 43161,
    },
    {
      rank: 10,
      id: 5,
      name: "Eric A. Tedrow",
      email: "EricATedrow@rhyta.com",
      value_purchases: 14072,
    },
    {
      rank: 1,
      id: 6,
      name: "Mary G. Ford",
      email: "MaryGFord@dayrep.com",
      value_purchases: 74957,
    },
    {
      rank: 5,
      id: 7,
      name: "Zelda D. Hodges",
      email: "ZeldaDHodges@dayrep.com",
      value_purchases: 57823,
    },
    {
      rank: 4,
      id: 8,
      name: "Sheila T. Britt",
      email: "SheilaTBritt@rhyta.com",
      value_purchases: 66871,
    },
    {
      rank: 3,
      id: 9,
      name: "John S. Perez",
      email: "JohnSPerez@teleworm.us",
      value_purchases: 68579,
    },
    {
      rank: 9,
      id: 10,
      name: "Chris S. Navarro",
      email: "ChrisSNavarro@dayrep.com",
      value_purchases: 24669,
    },
  ];
};

const fetchPendingPurchases = (id) => {
  return axios.get(`/api/suppliers/${id}/pending-purchases`);
};

const fetchUnitsPurchased = (id, year, monthly) => {
  return axios.get(`/api/suppliers/${id}/purchases/${year}?monthly=${monthly}`);
};

const fetchUnitsOrdered = (id, year, monthly) => {
  return axios.get(
    `/api/suppliers/${id}/purchases-orders/${year}?monthly=${monthly}`
  );
};

export {
  fetchSuppliers,
  fetchPendingPurchases,
  fetchUnitsPurchased,
  fetchUnitsOrdered,
};
