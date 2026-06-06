const supabase = require('../config/supabase');

const createVehicleSale = async (req, res) => {

    try {

        const {
            customer_id,
            vehicle_number,
            vehicle_model,
            sale_amount,
            remarks
        } = req.body;

        const { data, error } =
            await supabase
                .from('vehicle_sales')
                .insert([{
                    customer_id,
                    vehicle_number,
                    vehicle_model,
                    sale_amount,
                    remarks
                }])
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
const markVehicleOut = async (
    req,
    res
) => {

    try {

        const {
            id
        } = req.params;

        const {
            data,
            error
        } = await supabase
            .from('vehicle_sales')
            .update({
                status: 'OUT',
                out_date: new Date()
            })
            .eq('id', id)
            .select();

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
const getVehicles = async (
    req,
    res
) => {

    try {

        const {
            data,
            error
        } = await supabase
            .from('vehicle_sales')
            .select('*')
            .order(
                'created_at',
                {
                    ascending: false
                }
            );

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

module.exports = {
    createVehicleSale,
    markVehicleOut,
    getVehicles
};