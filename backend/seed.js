import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Inventory from './models/Inventory.js';

dotenv.config();

const MOCK_INVENTORY = [
    {
        name: "Fresh Tomatoes",
        category: "Vegetables",
        quantity: 15,
        unit: "kg",
        reorderLevel: 10,
        image: null
    },
    {
        name: "Chicken Breast",
        category: "Meat",
        quantity: 8,
        unit: "kg",
        reorderLevel: 15,
        image: null
    },
    {
        name: "Whole Milk",
        category: "Dairy",
        quantity: 24,
        unit: "liters",
        reorderLevel: 20,
        image: null
    },
    {
        name: "Basmati Rice",
        category: "Grains",
        quantity: 50,
        unit: "kg",
        reorderLevel: 25,
        image: null
    },
    {
        name: "Red Chili Powder",
        category: "Spices",
        quantity: 2,
        unit: "kg",
        reorderLevel: 5,
        image: null
    },
    {
        name: "Premium Coffee Beans",
        category: "Beverages",
        quantity: 12,
        unit: "kg",
        reorderLevel: 5,
        image: null
    },
    {
        name: "Atlantic Salmon",
        category: "Seafood",
        quantity: 5,
        unit: "kg",
        reorderLevel: 10,
        image: null
    },
    {
        name: "Brioche Buns",
        category: "Bakery",
        quantity: 120,
        unit: "units",
        reorderLevel: 50,
        image: null
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🚀 Connected to MongoDB Atlas for seeding...');

        // Clear existing inventory
        await Inventory.deleteMany({});
        console.log('🧹 Cleared existing inventory data.');

        // Insert mock data
        await Inventory.insertMany(MOCK_INVENTORY);
        console.log('✅ Mock data inserted successfully!');

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
