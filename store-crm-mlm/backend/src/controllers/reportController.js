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

        // MLM Users
        const { count: mlmUsers } =
            await supabase
                .from('users')
                .select('*', {
                    count: 'exact',
                    head: true
                })
                .eq('role', 'MLM_USER');

        // Sales
        const { data: sales } =
            await supabase
                .from('sales')
                .select('*');

        const totalSales =
            sales?.reduce(
                (sum, item) =>
                    sum +
                    Number(item.amount || 0),
                0
            ) || 0;

        const totalIncentives =
            sales?.reduce(
                (sum, item) =>
                    sum +
                    Number(item.incentive_amount || 0),
                0
            ) || 0;

        // Today's Sales
        const today =
            new Date()
                .toISOString()
                .split('T')[0];

        const todaySales =
            sales?.reduce(
                (sum, item) => {

                    const saleDate =
                        item.created_at
                            ?.split('T')[0];

                    if (saleDate === today) {

                        return (
                            sum +
                            Number(item.amount || 0)
                        );
                    }

                    return sum;

                },
                0
            ) || 0;

        // Products List
        const { data: products } =
            await supabase
                .from('products')
                .select('*');

        const lowStock =
            products?.filter(
                product =>
                    Number(
                        product.stock_quantity || 0
                    ) <=
                    Number(
                        product.min_stock || 0
                    )
            ) || [];

        // Commissions
        const { data: commissions } =
            await supabase
                .from('commissions')
                .select('*');

        const totalCommissions =
            commissions?.reduce(
                (sum, item) =>
                    sum +
                    Number(
                        item.commission_amount || 0
                    ),
                0
            ) || 0;

        return res.status(200).json({
            success: true,
            data: {
                totalCustomers:
                    customerCount || 0,

                totalProducts:
                    productCount || 0,

                totalMLMUsers:
                    mlmUsers || 0,

                totalSales,

                totalIncentives,

                totalCommissions,

                todaySales,

                lowStockProducts:
                    lowStock.length
            }
        });

    } catch (error) {

        console.error(
            'Dashboard Error:',
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getCustomerReport = async (req, res) => {

    try {

        const { data, error } =
            await supabase
                .from('customers')
                .select(`
                    *,
                    sales (
                        amount,
                        created_at
                    )
                `);

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
const getSalesReport = async (req, res) => {

    try {

        const { data, error } =
            await supabase
                .from('sales')
                .select('*')
                .order(
                    'created_at',
                    { ascending: false }
                );

        if (error) throw error;

        const totalSales =
            data.reduce(
                (sum, row) =>
                    sum + Number(row.amount),
                0
            );

        return res.json({
            success: true,
            totalSales,
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
const getCommissionReport = async (req, res) => {

    try {

        const { data, error } =
            await supabase
                .from('commissions')
                .select('*')
                .order(
                    'created_at',
                    { ascending: false }
                );

        if (error) throw error;

        const totalCommission =
            data.reduce(
                (sum, row) =>
                    sum +
                    Number(
                        row.commission_amount
                    ),
                0
            );

        return res.json({
            success: true,
            totalCommission,
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
const getLowStockReport = async (req, res) => {

    try {

        const { data, error } =
            await supabase
                .from('products')
                .select('*');

        if (error) throw error;

        const lowStock =
            data.filter(
                product =>
                    Number(
                        product.stock_quantity
                    ) <=
                    Number(
                        product.min_stock
                    )
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
const getDashboardCharts = async (req, res) => {

    try {

        const { data: sales } =
            await supabase
                .from('sales')
                .select('amount, created_at');

        return res.json({
            success: true,
            sales
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getBusinessReport =
async (req, res) => {

    try {

        const {
            count: customerCount
        } = await supabase
            .from('customers')
            .select('*', {
                count: 'exact',
                head: true
            });

        const {
            count: vehicleCount
        } = await supabase
            .from('vehicle_sales')
            .select('*', {
                count: 'exact',
                head: true
            });

        const {
            count: inventoryCount
        } = await supabase
            .from('inventory_transactions')
            .select('*', {
                count: 'exact',
                head: true
            });

        return res.json({
            success: true,
            data: {
                customers:
                    customerCount,
                vehicles:
                    vehicleCount,
                inventory:
                    inventoryCount
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message:
                error.message
        });
    }
};
module.exports = {
    getDashboardSummary,
    getCustomerReport,
    getSalesReport,
    getCommissionReport,
    getLowStockReport,
    getDashboardCharts,
    getBusinessReport
};