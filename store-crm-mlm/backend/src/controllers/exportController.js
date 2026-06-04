const ExcelJS = require('exceljs');
const supabase = require('../config/supabase');

const exportCustomers = async (req, res) => {

    const workbook = new ExcelJS.Workbook();
    const worksheet =
        workbook.addWorksheet('Customers');

    worksheet.columns = [
        { header: 'Name', key: 'customer_name', width: 30 },
        { header: 'Mobile', key: 'mobile', width: 20 },
        { header: 'City', key: 'city', width: 20 },
        { header: 'Card Type', key: 'card_type', width: 20 }
    ];

    const { data } =
        await supabase
            .from('customers')
            .select('*');

    worksheet.addRows(data);

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
        'Content-Disposition',
        'attachment; filename=customers.xlsx'
    );

    await workbook.xlsx.write(res);

    res.end();
};
const exportSales = async (req, res) => {

    const workbook = new ExcelJS.Workbook();
    const worksheet =
        workbook.addWorksheet('Sales');

    worksheet.columns = [
        { header: 'Sale ID', key: 'id', width: 40 },
        { header: 'Customer ID', key: 'customer_id', width: 40 },
        { header: 'Sale Type', key: 'sale_type', width: 25 },
        { header: 'Amount', key: 'amount', width: 15 },
        { header: 'Incentive', key: 'incentive_amount', width: 15 },
        { header: 'Date', key: 'created_at', width: 30 }
    ];

    const { data } =
        await supabase
            .from('sales')
            .select('*');

    worksheet.addRows(data);

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
        'Content-Disposition',
        'attachment; filename=sales.xlsx'
    );

    await workbook.xlsx.write(res);

    res.end();
};
const exportCommissions = async (req, res) => {

    const workbook = new ExcelJS.Workbook();
    const worksheet =
        workbook.addWorksheet('Commissions');

    worksheet.columns = [
        { header: 'Beneficiary', key: 'beneficiary_user_id', width: 40 },
        { header: 'Source User', key: 'source_user_id', width: 40 },
        { header: 'Level', key: 'commission_level', width: 15 },
        { header: 'Percentage', key: 'commission_percentage', width: 15 },
        { header: 'Amount', key: 'commission_amount', width: 15 },
        { header: 'Date', key: 'created_at', width: 30 }
    ];

    const { data } =
        await supabase
            .from('commissions')
            .select('*');

    worksheet.addRows(data);

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
        'Content-Disposition',
        'attachment; filename=commissions.xlsx'
    );

    await workbook.xlsx.write(res);

    res.end();
};

module.exports = {
    exportCustomers,
    exportSales,
    exportCommissions
};