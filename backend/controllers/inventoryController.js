import Inventory from '../models/Inventory.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';


export const getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find().sort({ createdAt: -1 });
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const addInventoryItem = async (req, res) => {
    try {
        const { name, category, quantity, unit, reorderLevel } = req.body;
        let imageUrl = null;

        if (req.file) {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'restaurant_inventory',
                resource_type: 'image'
            });
            imageUrl = result.secure_url;
            
            fs.unlinkSync(req.file.path);
        }

        const item = await Inventory.create({
            name,
            category,
            quantity,
            unit,
            reorderLevel,
            image: imageUrl,
            lastUpdatedBy: req.user._id
        });

        res.status(201).json(item);
    } catch (error) {
        
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(400).json({ message: error.message });
    }
};


export const updateInventoryItem = async (req, res) => {
    try {
        const { name, category, quantity, unit, reorderLevel, image } = req.body;
        const item = await Inventory.findById(req.params.id);

        if (item) {
            let imageUrl = image || item.image;

            if (req.file) {
                // Upload new image to Cloudinary
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'restaurant_inventory',
                    resource_type: 'image'
                });
                imageUrl = result.secure_url;
               
                fs.unlinkSync(req.file.path);
            }

            item.name = name || item.name;
            item.category = category || item.category;
            item.quantity = quantity !== undefined ? quantity : item.quantity;
            item.unit = unit || item.unit;
            item.reorderLevel = reorderLevel !== undefined ? reorderLevel : item.reorderLevel;
            item.image = imageUrl;
            item.lastUpdatedBy = req.user._id;

            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(400).json({ message: error.message });
    }
};


export const deleteInventoryItem = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id);

        if (item) {
            await item.deleteOne();
            res.json({ message: 'Item removed' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateStockUsage = async (req, res) => {
    try {
        const { amount } = req.body; // positive to add, negative to use
        const item = await Inventory.findById(req.params.id);

        if (item) {
            const newQuantity = item.quantity + amount;

            if (newQuantity < 0) {
                return res.status(400).json({ message: 'Insufficient stock available' });
            }

            item.quantity = newQuantity;
            item.lastUpdatedBy = req.user._id;

            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
