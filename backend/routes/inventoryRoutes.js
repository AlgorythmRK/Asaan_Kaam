import express from 'express';
import {
    getInventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    updateStockUsage
} from '../controllers/inventoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();


router.use(protect);

router.route('/')
    .get(getInventory)
    .post(authorize('admin', 'staff'), upload.single('image'), addInventoryItem);

router.route('/:id')
    .put(authorize('admin'), upload.single('image'), updateInventoryItem)
    .delete(authorize('admin'), deleteInventoryItem);

router.patch('/:id/stock', updateStockUsage);

export default router;
