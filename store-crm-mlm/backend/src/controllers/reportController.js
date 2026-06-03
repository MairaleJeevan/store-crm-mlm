const supabase = require('../config/supabase');

const getDashboardSummary = async (req, res) => {

    try {

        // Customers
        const { count: customerCount } =
            await supabase
                .from('customers')
                .select('*', {
                    count: 'exact',
                    head: true
                });

        // Products
        const { count: productCount } =
            await supabase
                .from('products')
                .select('*', {
                    count: 'exact',
                    head: true
                });

        // Sales
        const { data: sales } =
            await supabase
                .from('sales')
                .select('*');

        const totalSales =
            sales?.reduce(
                (sum, item) =>
                    sum + Number(item.amount || 0),
                0
            ) || 0;

        const totalIncentives =
            sales?.reduce(
                (sum, item) =>
                    sum +
                    Number(
                        item.incentive_amount || 0
                    ),
                0
            ) || 0;

        // Products
        const { data: products } =
            await supabase
                .from('products')
                .select('*');

        const lowStock =
            products?.filter(
                p =>
                    Number(
                        p.stock_quantity || 0
                    ) <=
                    Number(
                        p.min_stock || 0
                    )
            ) || [];

        return res.json({
            success: true,
            data: {
                totalCustomers:
                    customerCount || 0,

                totalProducts:
                    productCount || 0,

                totalSales,

                totalIncentives,

                lowStockProducts:
                    lowStock.length
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
    getDashboardSummary
};