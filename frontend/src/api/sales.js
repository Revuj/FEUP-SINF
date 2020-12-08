const fetchYearSales = (year) => {
  // No futuro fazer request à primavera API
  return [100, 123, 123, 320, 190, 250, 245, 230, 250, 320, 621];
};

const fetchOngoingSales = () => {
  return [
    {
      "id": 1,
      "date_order": "8/11/2020",
      "customer_name": "Phyllis P. Fry",
      "total_cost": 130,
      "items": [
        {
          "name" : "Rosemary Honey",
          "value_unit": 8,
          "number_units": 5
        },
        {
          "name" : "Eucalyptus Honey",
          "value_unit": 9,
          "number_units": 10
        }
      ]
    },
    {
      "id": 1,
      "date_order": "7/11/2020",
      "customer_name": "Brian P. Gossett",
      "total_cost": 41,
      "items": [
        {
          "name" : "Honey Candle",
          "value_unit": 7,
          "number_units": 3
        },
        {
          "name" : "Honey Soap",
          "value_unit": 4,
          "number_units": 5
        }
      ]
    },
    {
      "id": 1,
      "date_order": "7/11/2020",
      "customer_name": "Mike S. Garcia",
      "total_cost": 40,
      "items": [
        {
          "name" : "Honey Candy",
          "value_unit": 3,
          "number_units": 10
        },
        {
          "name" : "Honey Tea",
          "value_unit": 5,
          "number_units": 2
        }
      ]
    },
    {
      "id": 1,
      "date_order": "6/11/2020",
      "customer_name": "Richard A. Burton",
      "total_cost": 36,
      "items": [
        {
          "name" : "Honey Vinegar",
          "value_unit": 3,
          "number_units": 2
        },
        {
          "name" : "Honey Bread",
          "value_unit": 5,
          "number_units": 6
        }
      ]
    },
    {
      "id": 1,
      "date_order": "6/11/2020",
      "customer_name": "Eric A. Tedrow",
      "total_cost": 59,
      "items": [
        {
          "name" : "Mead",
          "value_unit": 10,
          "number_units": 2
        },
        {
          "name" : "Honey Brandy",
          "value_unit": 13,
          "number_units": 3
        }
      ]
    },
    {
      "id": 1,
      "date_order": "6/11/2020",
      "customer_name": "Mary G. Ford",
      "total_cost": 24,
      "items": [
        {
          "name" : "Honey Tea",
          "value_unit": 5,
          "number_units": 2
        },
        {
          "name" : "Honey Candle",
          "value_unit": 7,
          "number_units": 2
        }
      ]
    },
    {
      "id": 1,
      "date_order": "5/11/2020",
      "customer_name": "Zelda D. Hodges",
      "total_cost": 25,
      "items": [
        {
          "name" : "Honey Soap",
          "value_unit": 4,
          "number_units": 4
        },
        {
          "name" : "Honey Vinegar",
          "value_unit": 3,
          "number_units": 3
        }
      ]
    },
  ];
}

export { fetchYearSales, fetchOngoingSales };
