const supabase = require('../config/supabase');

// Stock In
const stockIn = async (req, res) => {

    try {

        const {
            product_id,
            quantity,
            remarks
        } = req.body;

        const { data: product, error: productError } =
            await supabase
                .from('products')
                .select('*')
                .eq('id', product_id)
                .single();

        if (productError || !product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const stockBefore =
            product.stock_quantity;

        const stockAfter =
            stockBefore + Number(quantity);

        await supabase
            .from('products')
            .update({
                stock_quantity: stockAfter
            })
            .eq('id', product_id);

        await supabase
            .from('inventory_transactions')
            .insert([{
                product_id,
                transaction_type: 'STOCK_IN',
                quantity,
                stock_before: stockBefore,
                stock_after: stockAfter,
                remarks,
                created_by: req.user.id
            }]);

        return res.json({
            success: true,
            stockBefore,
            stockAfter
        });

    } catch (error) {

    console.error('STOCK IN ERROR:', error);

    return res.status(500).json({
        success: false,
        message: error.message
    });
}
};

// Stock Out
const stockOut = async (req, res) => {

    try {

        const {
            product_id,
            quantity,
            remarks
        } = req.body;

        const { data: product, error: productError } =
            await supabase
                .from('products')
                .select('*')
                .eq('id', product_id)
                .single();

        if (productError || !product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const stockBefore =
            product.stock_quantity;

        if (stockBefore < quantity) {

            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        const stockAfter =
            stockBefore - Number(quantity);

        await supabase
            .from('products')
            .update({
                stock_quantity: stockAfter
            })
            .eq('id', product_id);

        await supabase
            .from('inventory_transactions')
            .insert([{
                product_id,
                transaction_type: 'STOCK_OUT',
                quantity,
                stock_before: stockBefore,
                stock_after: stockAfter,
                remarks,
                created_by: req.user.id
            }]);

        return res.json({
            success: true,
            stockBefore,
            stockAfter
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Ledger
const getInventoryLedger = async (req, res) => {

    try {

        const { data, error } =
            await supabase
                .from('inventory_transactions')
                .select('*')
                .order('created_at', {
                    ascending: false
                });

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

module.exports = {
    stockIn,
    stockOut,
    getInventoryLedger
};