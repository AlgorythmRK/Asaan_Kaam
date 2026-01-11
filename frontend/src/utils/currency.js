/**
 * Global Currency Utility for RestaurantHub
 * Configured for Indian Rupee (₹) with Indian digit grouping
 */

const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

/**
 * Formats a number as INR currency
 * @param {number} value - The numerical value to format
 * @returns {string} Formatted currency string (e.g., ₹1,20,000)
 */
export const formatCurrency = (value) => {
    if (typeof value !== 'number') return '₹0';
    return currencyFormatter.format(value);
};
