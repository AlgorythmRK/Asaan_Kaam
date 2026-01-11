import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an item name'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: [
            "Vegetables",
            "Meat",
            "Dairy",
            "Grains",
            "Spices",
            "Beverages",
            "Seafood",
            "Bakery",
            "Other"
        ]
    },
    quantity: {
        type: Number,
        required: [true, 'Please add a quantity'],
        min: [0, 'Quantity cannot be negative'],
        default: 0
    },
    unit: {
        type: String,
        required: [true, 'Please add a unit'],
        enum: [
            "kg",
            "grams",
            "liters",
            "ml",
            "packets",
            "units",
            "boxes",
            "trays"
        ]
    },
    reorderLevel: {
        type: Number,
        required: [true, 'Please add a reorder level'],
        min: [0, 'Reorder level cannot be negative'],
        default: 5
    },
    image: {
        type: String,
        default: null
    },
    lastUpdatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
