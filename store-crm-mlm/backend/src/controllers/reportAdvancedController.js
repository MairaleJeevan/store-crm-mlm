const supabase = require('../config/supabase');

const getCustomerReport = async (req, res) => {

    const { data, error } =
        await supabase
            .from('customers')
            .select('*');

    if (error)
        return res.status(500).json(error);

    return res.json({
        success: true,
        count: data.length,
        data
    });
};

const getSalesReport = async (req, res) => {

    const { data, error } =
        await supabase
            .from('sales')
            .select('*');

    if (error)
        return res.status(500).json(error);

    const totalSales =
        data.reduce(
            (sum, row) =>
                sum + Number(row.amount),
            0
        );

    return res.json({
        success: true,
        count: data.length,
        totalSales,
        data
    });
};

const getInventoryReport = async (req, res) => {

    const { data, error } =
        await supabase
            .from('inventory_transactions')
            .select('*');

    if (error)
        return res.status(500).json(error);

    return res.json({
        success: true,
        count: data.length,
        data
    });
};

module.exports = {
    getCustomerReport,
    getSalesReport,
    getInventoryReport
};