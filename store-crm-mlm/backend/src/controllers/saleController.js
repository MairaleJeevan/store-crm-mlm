const supabase = require('../config/supabase');
const {generateCommission} = require('./commissionController');

// Create Sale
const createSale = async (req, res) => {
    try {

            const {
                customer_id,
                product_id,
                sale_type,
                vehicle_number,
                number_plate_in,
                number_plate_out,
                quantity,
                amount
            } = req.body;

            if (!customer_id || !amount) {
                return res.status(400).json({
                    success: false,
                    message: 'Customer and amount are required'
                });
            }

            // Verify customer exists
            const { data: customer, error: customerError } = await supabase
                .from('customers')
                .select('id')
                .eq('id', customer_id)
                .single();

            if (customerError || !customer) {
                return res.status(400).json({
                    success: false,
                    message: 'Customer not found'
                });
            }

            // Get user role
            const { data: users } = await supabase
                .from('users')
                .select('role')
                .eq('id', req.user.id)
                .limit(1);

        const userRole = users[0]?.role || 'STAFF';

        // Get incentive %
        const { data: incentiveData } = await supabase
            .from('incentives')
            .select('*')
            .eq('role_name', userRole)
            .limit(1);

        const incentivePercent =
            incentiveData[0]?.percentage || 0;

        const incentiveAmount =
            (Number(amount) * Number(incentivePercent)) / 100;

        const saleData = {
            customer_id,
            product_id,
            sale_type,
            vehicle_number,
            number_plate_in,
            number_plate_out,
            quantity,
            amount,
            incentive_amount: incentiveAmount,
            created_by: req.user.id
        };

        const { data, error } = await supabase
            .from('sales')
            .insert([saleData])
            .select();
        if (data && data.length > 0) {

            await generateCommission(
                data[0].id,
                req.user.id,
                amount
            );
        }
        if (error) throw error;

        // Find customer sponsor

        const {
            data: customerSponsor
        } = await supabase
            .from('customers')
            .select('sponsor_id')
            .eq('id', customer_id)
            .single();

        if (customerSponsor?.sponsor_id) {

            const commissionAmount =
                Number(amount) * 0.05;

           const { data: commissionData, error: commissionError } =
                            await supabase
                                .from('commissions')
                                .insert([{
                                    sale_id: data[0].id,

                                    beneficiary_user_id:
                                        customerSponsor.sponsor_id,

                                    source_user_id:
                                        req.user.id,

                                    commission_level: 1,

                                    commission_percentage: 5,

                                    commission_amount:
                                        commissionAmount
                                }])
                                .select();

                        console.log(
                            'Commission Result:',
                            commissionData,
                            commissionError
                        );
                   

            console.log(
                'Commission Insert:',
                commissionData,
                commissionError
            );
        }

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

// Get All Sales
const getSales = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from('sales')
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

// Get Sale By ID
const getSaleById = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from('sales')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;

        return res.json({
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

// Today's Sales
const getTodaySales = async (req, res) => {
    try {

        const today = new Date();

        const startDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ).toISOString();

        const { data, error } = await supabase
            .from('sales')
            .select('*')
            .gte('created_at', startDate);

        if (error) throw error;

        const totalAmount = data.reduce(
            (sum, sale) =>
                sum + Number(sale.amount),
            0
        );

        return res.json({
            success: true,
            count: data.length,
            totalAmount,
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
    createSale,
    getSales,
    getSaleById,
    getTodaySales
};