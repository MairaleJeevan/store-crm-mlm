const supabase = require('../config/supabase');

// Create Product
const createProduct = async (req, res) => {

    try {

        const { data, error } = await supabase
            .from('products')
            .insert([req.body])
            .select();

        if (error) throw error;

        return res.status(201).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Products
const getProducts = async (req, res) => {

    try {

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('product_name');

        if (error) throw error;

        return res.json({
            success: true,
            count: data.length,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Low Stock Products
const getLowStockProducts = async (req, res) => {

    try {

        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) throw error;

        const lowStock =
            data.filter(
                item =>
                    Number(item.stock_quantity || 0)
                    <=
                    Number(item.min_stock || 0)
            );

        return res.json({
            success: true,
            count: lowStock.length,
            data: lowStock
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getLowStockProducts
};