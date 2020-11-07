const fetchYearProductProfit = (year) => {
    return [30, 50, 45, 60, 160, 90, 95, 95, 100, 400, 370];
};

const fetchProducts = () => {
    return [
        {
            "rank": 6,
            "id": 1,
            "name": "Honey Candy",
            "n_sold": 483,
            "stock": 500,
            "value_unit": 3
        },
        {
            "rank": 7,
            "id": 2,
            "name": "Honey Tea",
            "n_sold": 457,
            "stock": 500,
            "value_unit": 5
        },
        {
            "rank": 2,
            "id": 3,
            "name": "Honey Candle",
            "n_sold": 714,
            "stock": 800,
            "value_unit": 7
        },
        {
            "rank": 8,
            "id": 4,
            "name": "Honey Soap",
            "n_sold": 431,
            "stock": 500,
            "value_unit": 4
        },
        {
            "rank": 10,
            "id": 5,
            "name": "Honey Vinegar",
            "n_sold": 140,
            "stock": 200,
            "value_unit": 3
        },
        {
            "rank": 1,
            "id": 6,
            "name": "Honey Bread",
            "n_sold": 749,
            "stock": 800,
            "value_unit": 5
        },
        {
            "rank": 5,
            "id": 7,
            "name": "Mead",
            "n_sold": 578,
            "stock": 600,
            "value_unit": 10
        },
        {
            "rank": 4,
            "id": 8,
            "name": "Honey Brandy",
            "n_sold": 668,
            "stock": 700,
            "value_unit": 13
        },
        {
            "rank": 3,
            "id": 9,
            "name": "Rosemary Honey",
            "n_sold": 685,
            "stock": 700,
            "value_unit": 8
        },
        {
            "rank": 9,
            "id": 10,
            "name": "Eucalyptus Honey",
            "n_sold": 246,
            "stock": 300,
            "value_unit": 9
        },
    ];
};

export { fetchYearProductProfit, fetchProducts };
