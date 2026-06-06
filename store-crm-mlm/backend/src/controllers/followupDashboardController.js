const supabase =
    require('../config/supabase');

const getFollowupDashboard =
    async (req, res) => {

        try {

            const today =
                new Date()
                    .toISOString()
                    .split('T')[0];

            const {
                data,
                error
            } = await supabase
                .from('reminders')
                .select('*');

            if (error) throw error;

            const todayFollowups =
                data.filter(
                    r =>
                        r.reminder_date ===
                        today
                ).length;

            const overdue =
                data.filter(
                    r =>
                        r.reminder_date <
                        today &&
                        r.status !==
                        'COMPLETED'
                ).length;

            const upcoming =
                data.filter(
                    r =>
                        r.reminder_date >
                        today
                ).length;

            const completed =
                data.filter(
                    r =>
                        r.status ===
                        'COMPLETED'
                ).length;

            return res.json({
                success: true,
                data: {
                    todayFollowups,
                    overdue,
                    upcoming,
                    completed
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
    getFollowupDashboard
};