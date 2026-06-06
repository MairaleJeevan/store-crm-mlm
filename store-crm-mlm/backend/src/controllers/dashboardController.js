const supabase =
    require('../config/supabase');

const getDashboardSummary =
    async (req, res) => {

        try {

            const [
                customers,
                leads,
                sales,
                commissions,
                incentives
            ] = await Promise.all([

                supabase
                    .from('customers')
                    .select('*', {
                        count: 'exact',
                        head: true
                    }),

                supabase
                    .from('leads')
                    .select('*', {
                        count: 'exact',
                        head: true
                    }),

                supabase
                    .from('sales')
                    .select('amount'),

                supabase
                    .from('commissions')
                    .select('commission_amount'),

                supabase
                    .from('incentive_transactions')
                    .select('incentive_amount')
            ]);

            const totalSales =
                sales.data?.reduce(
                    (sum, item) =>
                        sum +
                        Number(item.amount),
                    0
                ) || 0;

            const totalCommission =
                commissions.data?.reduce(
                    (sum, item) =>
                        sum +
                        Number(
                            item.commission_amount
                        ),
                    0
                ) || 0;

            const totalIncentive =
                incentives.data?.reduce(
                    (sum, item) =>
                        sum +
                        Number(
                            item.incentive_amount
                        ),
                    0
                ) || 0;

            const { data: targets } =
                    await supabase
                        .from('sales_targets')
                        .select('*');

                const totalTarget =
                    targets?.reduce(
                        (sum, item) =>
                            sum +
                            Number(item.target_amount || 0),
                        0
                    ) || 0;

                const achievement =
                    totalTarget > 0
                        ? (
                            totalSales /
                            totalTarget
                        ) * 100
                        : 0;

                return res.json({
                    success: true,
                    data: {
                        customers:
                            customers.count || 0,

                        leads:
                            leads.count || 0,

                        totalSales,

                        totalCommission,

                        totalIncentive,

                        totalTarget,

                        achievement
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
    getDashboardSummary
};