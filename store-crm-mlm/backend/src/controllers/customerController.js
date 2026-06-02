const supabase = require('../config/supabase');

// Create Customer
const createCustomer = async (req, res) => {
    try {

        const customerData = {
            customer_name: req.body.customer_name,
            mobile: req.body.mobile,
            alternate_mobile: req.body.alternate_mobile,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,
            card_type: req.body.card_type || 'GREEN',
            created_by: req.user.id
        };

        const { data, error } = await supabase
            .from('customers')
            .insert([customerData])
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

// Get All Customers
const getCustomers = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .order('created_at', { ascending: false });

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

// Get Customer By ID
const getCustomerById = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from('customers')
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

// Update Customer
const updateCustomer = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from('customers')
            .update({
                customer_name: req.body.customer_name,
                mobile: req.body.mobile,
                alternate_mobile: req.body.alternate_mobile,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                card_type: req.body.card_type,
                updated_at: new Date()
            })
            .eq('id', req.params.id)
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

// Delete Customer
const deleteCustomer = async (req, res) => {
    try {

        const { error } = await supabase
            .from('customers')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;

        return res.json({
            success: true,
            message: 'Customer deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Search By Mobile
const searchCustomerByMobile = async (req, res) => {
    try {

        const mobile = req.params.mobile;

        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .ilike('mobile', `%${mobile}%`);

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
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    searchCustomerByMobile
};