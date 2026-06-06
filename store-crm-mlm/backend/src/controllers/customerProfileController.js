const supabase =
    require('../config/supabase');

const getCustomerProfile =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            const {
                data: customer
            } = await supabase
                .from('customers')
                .select('*')
                .eq('id', id)
                .single();

            const {
                data: sales
            } = await supabase
                .from('sales')
                .select('*')
                .eq('customer_id', id);

            const {
                data: vehicles
            } = await supabase
                .from('vehicle_sales')
                .select('*')
                .eq('customer_id', id);

            const {
                data: reminders
            } = await supabase
                .from('reminders')
                .select('*')
                .eq('customer_id', id);

            return res.json({
                success: true,
                data: {
                    customer,
                    sales,
                    vehicles,
                    reminders
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
    getCustomerProfile
};