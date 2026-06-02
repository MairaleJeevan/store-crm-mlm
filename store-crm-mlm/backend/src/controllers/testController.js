const supabase = require('../config/supabase');

const testDatabaseConnection = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from('incentives')
            .select('*');

        if (error) {
            throw error;
        }

        return res.status(200).json({
            success: true,
            message: 'Supabase Connected Successfully',
            totalRecords: data.length,
            data
        });

    } catch (error) {

        console.error('Database Error:', error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    testDatabaseConnection
};