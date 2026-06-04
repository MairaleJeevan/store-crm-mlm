const supabase = require('../config/supabase');

const getUsers = async (req, res) => {

    try {

        const { data, error } =
            await supabase
                .from('users')
                .select(`
                    id,
                    full_name,
                    email,
                    role,
                    referral_code,
                    level,
                    is_active,
                    created_at
                `)
                .order(
                    'created_at',
                    { ascending: false }
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

module.exports = {
    getUsers
};