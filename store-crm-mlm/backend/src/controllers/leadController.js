const supabase =
    require('../config/supabase');

const createLead = async (req, res) => {

    try {

        const {
            lead_name,
            mobile,
            source,
            assigned_to,
            remarks
        } = req.body;

        const { data, error } =
            await supabase
                .from('leads')
                .insert([
                    {
                        lead_name,
                        mobile,
                        source,
                        assigned_to,
                        remarks
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

const getLeads = async (req, res) => {

    try {

        const { data, error } =
            await supabase
                .from('leads')
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

const convertLead = async (req, res) => {

    try {

        const { id } = req.params;

        const { data: lead } =
            await supabase
                .from('leads')
                .select('*')
                .eq('id', id)
                .single();

        if (!lead) {

            return res.status(404).json({
                success: false,
                message: 'Lead not found'
            });
        }

        const { data: customer, error } =
            await supabase
                .from('customers')
                .insert([
                    {
                        customer_name: lead.lead_name,
                        mobile: lead.mobile,
                        city: '',
                        card_type: 'GREEN'
                    }
                ])
                .select();

        if (error) throw error;

        await supabase
            .from('leads')
            .update({
                status: 'CONVERTED'
            })
            .eq('id', id);

        return res.json({
            success: true,
            customer
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateLeadStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const { data, error } =
            await supabase
                .from('leads')
                .update({ status })
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

const getLeadPipeline = async (req, res) => {

    try {

        const { data, error } =
            await supabase
                .from('leads')
                .select('status');

        if (error) throw error;

        const stats = {
            NEW: 0,
            CONTACTED: 0,
            INTERESTED: 0,
            FOLLOWUP: 0,
            CONVERTED: 0,
            LOST: 0
        };

        data.forEach(lead => {

            if (stats[lead.status] !== undefined) {

                stats[lead.status]++;
            }
        });

        return res.json({
            success: true,
            data: stats
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    createLead,
    getLeads,
    convertLead,
    updateLeadStatus,
    getLeadPipeline
};