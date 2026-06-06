const supabase =
    require('../config/supabase');

// Create Reminder
const createReminder =
    async (req, res) => {

        try {

            const {
                customer_id,
                title,
                reminder_date,
                remarks
            } = req.body;

            const {
                data,
                error
            } = await supabase
                .from('reminders')
                .insert([
                    {
                        customer_id,
                        title,
                        reminder_date,
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
                message:
                    error.message
            });
        }
    };

// Get Reminders
const getReminders =
    async (req, res) => {

        try {

            const {
                data,
                error
            } = await supabase
                .from('reminders')
                .select('*')
                .order(
                    'reminder_date',
                    {
                        ascending: true
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
                message:
                    error.message
            });
        }
    };

module.exports = {
    createReminder,
    getReminders
};