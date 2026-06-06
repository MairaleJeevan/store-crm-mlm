const supabase = require('../config/supabase');

const getStockDashboard = async (req, res) => {

    try {

        const { data, error } =
            await supabase
                .from('products')
                .select('*');

        if (error) throw error;

        const totalProducts =
            data.length;

        const totalStock =
            data.reduce(
                (sum, p) =>
                    sum + (p.stock_quantity || 0),
                0
            );

        const inventoryValue =
            data.reduce(
                (sum, p) =>
                    sum +
                    (
                        (p.stock_quantity || 0) *
                        (Number(p.purchase_price) || 0)
                    ),
                0
            );

        const lowStock =
            data.filter(
                p =>
                    p.stock_quantity <=
                    p.min_stock
            ).length;

        return res.json({
            success: true,
            data: {
                totalProducts,
                totalStock,
                inventoryValue,
                lowStock
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getStockDashboard
};