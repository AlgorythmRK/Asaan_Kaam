export const CATEGORIES = [
    "Vegetables",
    "Meat",
    "Dairy",
    "Grains",
    "Spices",
    "Beverages",
    "Seafood",
    "Bakery",
    "Other"
];

export const UNITS = [
    "kg",
    "grams",
    "liters",
    "ml",
    "packets",
    "units",
    "boxes",
    "trays"
];

export const MOCK_INVENTORY = [
    {
        id: "1",
        name: "Fresh Tomatoes",
        category: "Vegetables",
        quantity: 15,
        unit: "kg",
        reorderLevel: 10,
        image: null,
        lastUpdated: new Date().toISOString()
    },
    {
        id: "2",
        name: "Chicken Breast",
        category: "Meat",
        quantity: 8,
        unit: "kg",
        reorderLevel: 15,
        image: null,
        lastUpdated: new Date().toISOString()
    },
    {
        id: "3",
        name: "Whole Milk",
        category: "Dairy",
        quantity: 24,
        unit: "liters",
        reorderLevel: 20,
        image: null,
        lastUpdated: new Date().toISOString()
    },
    {
        id: "4",
        name: "Basmati Rice",
        category: "Grains",
        quantity: 50,
        unit: "kg",
        reorderLevel: 25,
        image: null,
        lastUpdated: new Date().toISOString()
    },
    {
        id: "5",
        name: "Red Chili Powder",
        category: "Spices",
        quantity: 2,
        unit: "kg",
        reorderLevel: 5,
        image: null,
        lastUpdated: new Date().toISOString()
    },
    {
        id: "6",
        name: "Premium Coffee Beans",
        category: "Beverages",
        quantity: 12,
        unit: "kg",
        reorderLevel: 5,
        image: null,
        lastUpdated: new Date().toISOString()
    },
    {
        id: "7",
        name: "Atlantic Salmon",
        category: "Seafood",
        quantity: 5,
        unit: "kg",
        reorderLevel: 10,
        image: null,
        lastUpdated: new Date().toISOString()
    },
    {
        id: "8",
        name: "Brioche Buns",
        category: "Bakery",
        quantity: 120,
        unit: "units",
        reorderLevel: 50,
        image: null,
        lastUpdated: new Date().toISOString()
    }
];
