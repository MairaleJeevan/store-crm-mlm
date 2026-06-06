const supabase =
    require('../config/supabase');

const getAnalytics =
    async (req, res) => {

        try {

            const { data: sales } =
                await supabase
                    .from('sales')
                    .select(
                        'amount, created_at'
                    );

            const monthlyData = {};

            sales.forEach((sale) => {

                const month =
                    new Date(
                        sale.created_at
                    ).toLocaleString(
                        'default',
                        {
                            month: 'short'
                        }
                    );

                monthlyData[month] =
                    (
                        monthlyData[month] ||
                        0
                    ) +
                    Number(
                        sale.amount
                    );
            });

            const chartData =
                Object.keys(
                    monthlyData
                ).map(
                    (month) => ({
                        month,
                        revenue:
                            monthlyData[
                            month
                            ]
                    })
                );

            return res.json({
                success: true,
                data: chartData
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
    getAnalytics
};