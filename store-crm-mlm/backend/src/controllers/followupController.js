const supabase = require('../config/supabase');

// Create Followup
const createFollowup = async (req, res) => {
    try {

        const {
            customer_id,
            followup_date,
            remarks,
            created_by
        } = req.body;

        const { data, error } = await supabase
            .from('followups')
            .insert([
                {
                    customer_id,
                    followup_date,
                    remarks,
                    created_by
                }
            ])
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

// Get All Followups
const getFollowups = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from('followups')
            .select('*')
            .order('followup_date', {
                ascending: true
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

// Get Today's Followups
const getTodayFollowups = async (req, res) => {
    try {

        const today =
            new Date()
                .toISOString()
                .split('T')[0];

        const { data, error } = await supabase
            .from('followups')
           .select('*')
            .eq('followup_date', today)
            .eq('status', 'PENDING');

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

// Complete Followup
const completeFollowup = async (req, res) => {
    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from('followups')
            .update({
                status: 'COMPLETED'
            })
            .eq('id', id)
            .select();

        if (error) throw error;

        return res.json({
            success: true,
            message: 'Followup completed',
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
    createFollowup,
    getFollowups,
    getTodayFollowups,
    completeFollowup
};